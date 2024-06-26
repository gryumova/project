import React from 'react';

import TokenTable from './components/TokenTable/TokenTable.js';
import AddToken from './components/AddToken/AddToken.js';
import WalletList from './components/WalletList/WalletList.js';
import AddWallet from './components/AddWallet/AddWallet.js';
import './App.css';

function App() {
    return (
        <div className="App">
            <div className='control-panel'>
                <WalletList/>
                <div className='buttons'>
                    <AddWallet/>
                    <AddToken/>
                </div>
            </div>
            <TokenTable/>
            <div className='footer'>v1.0.0</div>
        </div>
    );
}

export default App;
