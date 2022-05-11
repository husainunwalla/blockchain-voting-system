import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumCOntract = () => {
    const provider = ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({ provider, signer, transactionContract });
}

export const TransactionsProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });

    const checkIfWalletConnected = async () => {
        try {
            if (!ethereum) return alert("Connect MetaMask Wallet");
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (accounts.length) {
                setCurrentAccount(accounts[0])
                //getAllTransactions();
            } else {
                console.log("No Accounts Found");
            }
        } catch (error) {
            throw new Error("No Ethereum object");
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Connect MetaMask Wallet");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentAccount(accounts[0]);
        }
        catch (error) {
            throw new Error("No Ethereum object");
        }
    }

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Connect MetaMask Wallet");

        } catch (error) {
            throw new Error("No Ethereum object");
        }
    }

    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount }}>
            {children}
        </TransactionContext.Provider>
    )
}