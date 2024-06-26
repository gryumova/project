import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import 'ag-grid-enterprise';

import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo, useState } from 'react';

import CustomToolPanel from '../AggridFilter/filters.js';
import { BalanceFormatter, PriceFormatter, ValueRenderer } from './value_renderer';
import { updateToken, removeToken } from '../../store/actions.js';
import { deleteBalance } from '../../requests/balanceApi.js';
import LastUpdate from './menu_item';
import "./TokenTable.css";

function TokenTable () { 
    const dispatch = useDispatch(); 
    const balance = useSelector((state) => state.token);
    const [rowData, setRowData] = useState(balance);

    useEffect(() => {
        const chatSocket =  new WebSocket(`ws://localhost:8000/ws/wallet/`);
    
        chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
    
            if (data.balance) dispatch(updateToken(data.balance));
        }
    }, []);

    useEffect(() => {
        setRowData(balance);
    }, [balance]);

    const onCellValueChanged = useCallback((params) => {
        params.api.refreshClientSideRowModel();
    }, []);

    const columnDefs = [
        { field: 'wallet_name', headerName: 'wallet', cellClass: ['celClass', 'celClassLeft']},
        { field: 'token', headerName: 'asset', cellClass: ['celClass', 'celClassLeft'] },
        { field: 'token', headerName: 'asset', cellClass: ['celClass', 'celClassLeft'] },
        { field: 'network_name', headerName: 'network', cellClass: ['celClass', 'celClassLeft'] },
        { field: 'balance', headerName: 'quantity', filter: 'agNumberColumnFilter', cellRenderer: BalanceFormatter,  cellClass: ['celClass', 'celClassLeft'] },
        { field: 'price', headerName: 'price', filter: 'agNumberColumnFilter', cellRenderer: PriceFormatter, cellClass: ['celClass', 'celClassLeft'] },
        {
            field: 'value',
            headerName: "value",
            cellRenderer: ValueRenderer,
            cellClass: ['celClass', 'celClassLeft']
        },
        { 
            field: 'updated', 
            headerName: 'last_update', 
            cellClass: ['celClass', 'celClassRight'], 
            headerClass: "ag-right-aligned-header",
            cellRenderer: LastUpdate
        }
    ];

    const sideBar = useMemo(() => {
        return {
            toolPanels: [
                {
                    id: 'customStats',
                    labelDefault: 'Table Filters',
                    labelKey: 'customStats',
                    iconKey: 'custom-stats',
                    toolPanel: CustomToolPanel,
                    toolPanelParams: {
                        len: rowData.length
                    }
                }
            ]
        }
    } , [rowData])

    const defaultColDef = useMemo(() => {
        return {
          editable: true,
          enableRowGroup: true,
          enablePivot: true,
          enableValue: true,
          sortable: true,
          resizable: true,
          filter: true,
          flex: 1,
          minWidth: 40,
        };
    }, []);

    const getContextMenuItems = useCallback((params) => {
        return [
          ...(params.defaultItems || []),
          'separator',
          {
            name: 'Delete row',
            action: () => handleClick(params.node.data)
          },
        ];
      }, []);

    const handleClick = (data) => {
        deleteBalance(data.id);
        dispatch(removeToken(data.id));
    }

    return (
        <div
         className="ag-theme-quartz aggrid" 
        >
            <AgGridReact
                rowData={rowData}
                sideBar={sideBar}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                getContextMenuItems={getContextMenuItems}
                suppressMenuHide
                reactiveCustomComponents
                onCellValueChanged={onCellValueChanged}
            />
        </div>
      )
}

export default TokenTable;