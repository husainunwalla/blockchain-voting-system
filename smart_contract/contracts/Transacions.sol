//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCount;
    uint256 voteA;
    uint256 voteB;
    event Transfer(address from, address receiver, uint256 amount, string message, uint256 timestamp, string keyword, string vote);

    struct TransferStruct {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
        string vote;
    }

    TransferStruct[] transactions;

    function addToChain(address payable receiver, uint256 amount, string memory message, string memory keyword, string memory vote
    ) public {
        if (keccak256(bytes(vote)) == keccak256(bytes('A'))){
            voteA += 1;
        }else{
            voteB += 1;
        }
        transactionCount += 1;
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword, vote));

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword, vote);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory)
    {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }

    function getVotes() public view returns (uint256[2] memory){
        return [voteA, voteB];
    }
}
