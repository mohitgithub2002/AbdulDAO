import { ethers, providers } from "ethers";
import {contract,signer} from "./connectContract"
function Signature() {
  const signCreate = async (user,amount,time) => {
    console.log(user,amount,time);
    try {
      const domain = {
        name: "Abdul-DAO-8955",
        version: "675",
        chainId: 80001,
        verifyingContract: "0x9C820370857E403aD50a687c6FDbAC4e2a763C97",
      };

      const value = {
        user: user,
        amount: amount,
        time: time,
      };
      
      const types = {
        VoteVoucher: [
          { name: "user", type: "address" },
          { name: "amount", type: "uint256" },
          { name: "time", type: "uint256" },
        ],
      };

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let signature = await signer._signTypedData(domain, types, value);
      console.log(value, signature);
      return { signature };
    } catch (error) {
      console.log(error);
    }
  };

  return {
    signCreate,
  };
}

export default Signature;
