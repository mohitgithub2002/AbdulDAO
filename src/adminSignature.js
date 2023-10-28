import { ethers } from "ethers";

        const SIGNING_DOMAIN_NAME = "Abdul-DAO-8955"
        const SIGNING_DOMAIN_VERSION = "675"
        const chainId = 80001
        const contractAddress = "0xB48dbC24F8D883A5890f97d2054a5b0c4E49C735" // Put the address here from remix
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const domain = {
            name: SIGNING_DOMAIN_NAME,
            version: SIGNING_DOMAIN_VERSION,
            verifyingContract: contractAddress,
            chainId
        }

        async function createVoucher(user, proposalId, option, numberOfVotes, time) {
            const voucher = { user, proposalId, option, numberOfVotes, time }
            const types = {
                VoteVoucher2: [
                    { name: "user", type: "address" },
                    { name: "proposalId", type: "uint256" },
                    { name: "option", type: "uint256" },
                    { name: "numberOfVotes", type: "uint256" },
                    { name: "time", type: "uint256" }
                ]
            }
            console.log("domain, types, voucher : ", domain, types, voucher);
            const signature = await signer._signTypedData(domain, types, voucher)
            return {
                ...voucher,
                signature
            }
        }

        async function main(user, proposalId, option, numberOfVotes) {
            const voucher = await createVoucher(user, proposalId, option, numberOfVotes, parseInt(Date.now() / 1000)) // the address is the address which receives the NFT
            console.log(`[${voucher.user}, ${voucher.proposalId}, "${voucher.option}", "${voucher.numberOfVotes}","${voucher.time}", "${voucher.signature}"]`)
            return voucher;
        }

        export default main;