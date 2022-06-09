import React, { useContext } from "react";

import { TransactionContext } from "../context/TransactionContext";

import useFetch from "../hooks/useFetch";
import { shortenAddress } from "../utils/shortenAddress";

import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const TransactionsCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url, vote }) => {
    const gifUrl = useFetch({ keyword });

    return (
        <div className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
        >
            <div className="flex flex-col items-center w-full mt-3">
                <div className="display-flex justify-start w-full mb-6 p-2">
                    <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
                        <p className="text-white text-base">From: {shortenAddress(addressFrom)}</p>
                    </a>
                    <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
                        <p className="text-white text-base">To: {shortenAddress(addressTo)}</p>
                    </a>
                    <p className="text-white text-base">Fees: {amount} ETH</p>
                    <p className="text-white text-base">Vote: {vote} </p>
                    {message && (
                        <>
                            <br />
                            <p className="text-white text-base">Message: {message}</p>
                        </>
                    )}
                </div>
                <img
                    src={gifUrl || url}
                    alt="nature"
                    className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
                />
                <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
                    <p className="text-[#37c7da] font-bold">{timestamp}</p>
                </div>
            </div>
        </div>
    );
};

const Transactions = () => {
    const { transactions, currentAccount, transactionCount, allVotes } = useContext(TransactionContext);
    var allVotesArr = allVotes.split(',');

    const chartData = {
        labels: ['A', 'B'],
        datasets: [
            {
                label: 'Votes',
                backgroundColor: ['hsla(225,39%,30%,1)', 'hsla(339,49%,30%,1)'],
                borderColor: 'rgb(254 215 170 1)',
                borderWidth: 2,
                data: allVotesArr
            }
        ]
    }

    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-services">
            <div className="flex flex-col md:p-12 py-12 px-4">
                {currentAccount ? (
                    <h3 className="text-white text-3xl text-center my-2">
                        Latest Votes, Total Count {transactionCount}
                    </h3>
                ) : (
                    <h3 className="text-white text-3xl text-center my-2">
                        Connect your account to see the latest Votes
                    </h3>
                )}

                <div className="flex flex-wrap justify-center items-center">
                    <div className=" m-4 flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[300px] min-w-full flex-col p-3 rounded-md hover:shadow-2xl">
                        <div className="flex flex-col items-center w-full mt-3">
                            <Doughnut
                                data={chartData}
                                options={{}}
                            />
                        </div>
                    </div>
                </div>


                <div className="flex flex-wrap justify-center items-center mt-10">
                    {transactions.reverse().map((transaction, i) => (
                        <TransactionsCard key={i} {...transaction} />
                    ))}
                </div>


            </div>
        </div >
    );
};

export default Transactions;