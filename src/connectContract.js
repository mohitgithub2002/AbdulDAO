import { ethers } from 'ethers';
let contract;
let signer;
const connectContract = async () => {
    try{
        const Address = "0x24b85C4CEF128b4769a08497775f50831c704AD2"
        const Abi = [
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_topic",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_startTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_endTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "_question",
                        "type": "string"
                    },
                    {
                        "internalType": "string[]",
                        "name": "_options",
                        "type": "string[]"
                    }
                ],
                "name": "addProposal",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_proposalId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_option",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_numberOfVotes",
                        "type": "uint256"
                    }
                ],
                "name": "adminVoteByProposalId",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_proposalId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "_topic",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_startTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_endTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "_question",
                        "type": "string"
                    },
                    {
                        "internalType": "string[]",
                        "name": "_options",
                        "type": "string[]"
                    }
                ],
                "name": "editProposalById",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "user",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "amount",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "time",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bytes",
                                "name": "signature",
                                "type": "bytes"
                            }
                        ],
                        "internalType": "struct DAO.LazyNFTVoucher",
                        "name": "voucher",
                        "type": "tuple"
                    }
                ],
                "name": "redeem",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "transferOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_tokenContract",
                        "type": "address"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            },
            {
                "inputs": [],
                "name": "renounceOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_amount",
                        "type": "uint256"
                    }
                ],
                "name": "transferTokens",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_proposalId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_option",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_numberOfVotes",
                        "type": "uint256"
                    }
                ],
                "name": "userVoteByProposalId",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getAllProposals",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "topic",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "startTime",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "endTime",
                                "type": "uint256"
                            },
                            {
                                "internalType": "string",
                                "name": "question",
                                "type": "string"
                            },
                            {
                                "internalType": "string[]",
                                "name": "options",
                                "type": "string[]"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "votes",
                                "type": "uint256[]"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "adminVotes",
                                "type": "uint256[]"
                            }
                        ],
                        "internalType": "struct DAO.Proposal[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_proposalId",
                        "type": "uint256"
                    }
                ],
                "name": "getProposalById",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    },
                    {
                        "internalType": "string[]",
                        "name": "",
                        "type": "string[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "votes",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "adminVotes",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bytes",
                        "name": "",
                        "type": "bytes"
                    }
                ],
                "name": "isSignUsed",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "minter",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "proposalCount",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "user",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "amount",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "time",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bytes",
                                "name": "signature",
                                "type": "bytes"
                            }
                        ],
                        "internalType": "struct DAO.LazyNFTVoucher",
                        "name": "voucher",
                        "type": "tuple"
                    }
                ],
                "name": "recover",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "remainingTokens",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "tokenContract",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ]
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        contract = new ethers.Contract(Address, Abi, signer);
    }catch(error){
        console.log(error)
    }

}
export default connectContract;
export {contract,signer};