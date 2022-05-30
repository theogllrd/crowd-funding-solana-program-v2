import './App.css';
import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import Header from "./components/Header";

export const WalletConnectedContext = React.createContext();

function App() {

  const [walletConnected, setWalletConnected] = useState(null);

  const connectWallet = async () => {
    try {
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          const response = await solana.connect();
          setWalletConnected(response.publicKey.toString());
        } else {
          alert('Solana object not found! Get a Phantom Wallet 👻');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dicconnectWallet = async () => {
    try {
      const { solana } = window;
      if (!solana.isConnected) {
        alert('Your not connected');
        return;
      }
      const response = await window.solana.disconnect();
      setWalletConnected(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <WalletConnectedContext.Provider value={walletConnected}>
        <Header
          passedFunctionConnectWallet={connectWallet}
          passedFunctionDisconnectWallet={dicconnectWallet} />
        <Outlet />
      </WalletConnectedContext.Provider>

    </div >
  );
}

export default App;


