import './WalletList.css'
import WalletItem from './WalletItem'
import { useSelector } from 'react-redux';

function WalletList(props) {
    const wallets = useSelector((state) => state.wallet);

    return (
        <div className='wallet_list'>
            <p className='wallet_wrapper_title'>Wallet List</p>
            <div
                className="wallets_wrapper"
            >
                {
                  wallets && wallets.map((item, index)=>{
                     return  <WalletItem key={index} wallet={item} index={index}></WalletItem>
                 })
                }
            </div>
        </div>
    )
}

export default WalletList 