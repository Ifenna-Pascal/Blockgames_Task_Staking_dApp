import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";

function App() {
  const [currentAccount, setCurrentAccount] = useState("")
  const checkIfWalletIsConnected = async () => {
    let eth;
    if (window !== 'undefined') {
      eth = window.ethereum;
    }
    try {
      if (!eth) return alert('please install metamask');
      let accounts = await eth.request({ method: 'eth_accounts' });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        console.log('connected');
      }
    } catch (error) {
      console.error(error);
      throw new Error('No ethereum object');
    }
  };
  useEffect (()=> {
    checkIfWalletIsConnected();
  }, [])
  const connect = async () => {
    let eth;
        if (window !== 'undefined') {
          eth = window.ethereum;
        }
        try {
          console.log(eth);
          if (!eth) return alert('please install metamask');
          const accounts = await eth.request({ method: 'eth_requestAccounts' });
          setCurrentAccount(accounts[0]);
        } catch (error) {
          console.error(error);
          throw new Error('No ethereum object');
        }
      };
      const checkIfWalletIsConnected = async () => {
        let eth;
        if (window !== 'undefined') {
          eth = window.ethereum;
        }
        try {
          if (!eth) return alert('please install metamask');
          let accounts = await eth.request({ method: 'eth_accounts' });
          if (accounts.length) {
            setCurrentAccount(accounts[0]);
            console.log('connected');
          }
        } catch (error) {
          console.error(error);
          throw new Error('No ethereum object');
        }
  }
  return (
    <div className="text-green-400 w-100 h-screen bg-gray-900">
      <button onClick={connect}>Connect Wallet</button>
      <div className='h-10 w-full bg-blue-300'><span className='text-green-500 font-bold'>IFT Token Staking</span></div>
      <div className='container mx-auto'>
          <div className='flex flex-col'>
              <div>Your Staked: 100000</div>
              
          </div>
      </div>
    </div>
  );
}

export default App;
