import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({ provider, signer, transactionsContract });
}

export const TransactionsProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));

    const handleChange = (e, name) => {
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

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
            const { addressTo, amount, keyword, message } = formData;
            const transactionsContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);
            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: "0x5208",
                    value: parsedAmount._hex,
                }],
            });

            const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            console.log(`Success - ${transactionHash.hash}`);
            setIsLoading(false);

            const transactionsCount = await transactionsContract.getTransactionCount();
        } catch (error) {
            throw new Error("No Ethereum object");
        }
    }

    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setformData, handleChange, sendTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}