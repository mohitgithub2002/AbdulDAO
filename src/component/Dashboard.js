import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Signature from "../Signature";
import { contract } from "../connectContract";
import axios from "axios";
import { ethers } from "ethers";
const Dashboard = () => {
    const {signCreate} = Signature();
    const [account, setAccount] = useState("");
    const[amount,setAmount] = useState();
    const [totalInvestment, setTotalInvestment] = useState(0);
    const [claimAmount, setClaimAmount] = useState(0);
    const [restAmount, setRestAmount] = useState(0);
    const[time,setTime] = useState();
    useEffect(() => {
        if(window.ethereum){
            window.ethereum.request({ method: 'eth_requestAccounts' }).then((res)=>{
                setAccount(res[0]);
            })
        }
    }, [amount]);

    useEffect(() => {
        const user = Cookies.get("user");
        setTotalInvestment(JSON.parse(user).total_investment);
        const apiURL = "https://api.prpcommunity.net/getAmount/"+JSON.parse(user).user_id;
        axios.get(apiURL).then((res)=>{
            console.log(res.data.amount);
            setClaimAmount(res.data.amount);
            setRestAmount(totalInvestment-res.data.amount)
        })

    }, [account]);
    
    


    const handelSubmit = async ()=>{
       try{ 
        if(amount>restAmount){alert("You can't claim more than your investment");return}
        const user = Cookies.get("user");
        const username = JSON.parse(user).user_id;
        const date = new Date();
        const timestamp = date.getTime();
        const signature = await signCreate(account,ethers.utils.parseEther(amount),timestamp);
        const voucher = [account,ethers.utils.parseEther(amount),timestamp.toString(),signature.signature]
        const res = await contract.redeem(voucher);
        const tx = await res.wait();
        console.log(tx);
        const update = axios.post("https://api.prpcommunity.net/update",{
            user:username,
            amount:amount
        })
        console.log(update);
        alert("Transaction Successfull")
        window.location.href = "/"
        }catch(error){
            console.log(error);
            alert(error.reason);
        }
    }
    
    
    return (
        <>
            <div class="relative min-h-screen w-full  z-0">
                <div class="absolute inset-0 z-0 h-full w-full"></div>
                <div class="container mx-auto p-4">
                    <div class="flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md absolute top-2/4 left-2/4 w-full max-w-[20rem] md:max-w-[40rem] -translate-y-2/4 -translate-x-2/4">
                        <div class="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg -mt-6 mb-4 grid h-28  place-items-center">
                            <h3 class="block antialiased tracking-normal font-sans text-md sm:text-3xl font-semibold leading-snug text-white">
                                Claim your available Investment
                            </h3>
                        </div>
                        <div class="p-6 flex flex-col ">
                            <div className="my-3 ">

                                <h1 className="font-bold text-sky-600 text-md sm:text-lg md:text-xl my-2 ">
                                    Total Investment : {totalInvestment} USD
                                </h1>
                                <h1 className="font-bold text-sky-600 text-md sm:text-lg md:text-xl my-2 ">
                                    Claimed Investment : {claimAmount} USD                            </h1>
                                <h1 className="font-bold text-sky-600 text-md sm:text-lg md:text-xl my-2 ">
                                    Remaining Investment : {restAmount} USD
                                </h1>
                            </div>

                            <div className="mt-1.5 text-left pt-2 md:pt-0">
                                <label
                                    for="tokens"
                                    className="block text-gray-600 font-medium text-sm sm:text-lg"
                                >
                                    Remaining Investment
                                </label>
                                <div className=" mt-0.5 rounded-md shadow-sm">
                                    <input
                                        type="text"
                                        name="token"
                                        id="token"
                                        
                                        placeholder=""
                                        className="block w-full rounded-md  py-2.5 sm:py-1.5 pl-4 pr-10     shadow-sm  border-solid border-2 border-blue-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-base font-medium sm:leading-10 outline-none "
                                        onChange={(e) => {setAmount(e.target.value)}}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="p-6 pt-0">
                            <button
                                class="middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xl py-3 px-6 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] block w-full"
                                type="button"
                                onClick={handelSubmit}
                            >
                                Claim Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
