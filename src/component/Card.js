import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {contract} from "../connectContract"
import Web3 from "web3";
import { Address,contractAbi } from "../connectContract";

const Card = ({userAddress}) => {
  const web3 = new Web3(window.ethereum);
  const [proposal ,setproposal] = useState([]);
  const [isOwner,setIsOwner] = useState();
  const [account, setAccount] = useState('');
  const [isActive, setIsActive] = useState();
  const [loader, setLoader] = useState(false);
  //connect to metamask
  
  const getAllProposal = async () => {
    console.log("user is",userAddress)
    setLoader(true);
    try{
      const mainContract = new web3.eth.Contract(contractAbi,Address)
      const owner = await mainContract.methods.owner().call();
      console.log("owner is",owner,userAddress)
      
      const proposals = [];
      const data = await mainContract.methods.getAllProposals().call();
      console.log(data);
      
      data.forEach(element => {
        proposals.push(element)
      });
      setproposal(proposals);
      setLoader(false);
    }catch(error){
      console.log(error)
      alert(error)
      setLoader(false);
    } 
  }

  useEffect(()=>{
    getAllProposal()
    
  },[userAddress])
  const checkActive =  (start,end)=>{
    
      const now =  Date.now();

      console.log("now is",now,Number(end)*1000)
      if(now<(Number(start)*1000)){
        return("Upcoming");
      }
      else if(now>(Number(start)*1000) && now<(Number(end)*1000)){
        return("Active");
      }
      else if(now>(Number(end)*1000)){
        return("Ended");
      }
      else{
        return("Not declared");
      }
      
      
      
  }
  const data =  async ()=>{
    try{
      const mainContract = new web3.eth.Contract(contractAbi,Address)
      const user = await mainContract.methods.owner().call();
      if(account===user.toLowerCase()){ setIsOwner(true); console.log("owner is",user)}
      else{setIsOwner(false)}
    }catch(error){
      console.log(error)
    }
    
  }
  useEffect(()=>{
    data()
  },[account])
  console.log("proposals is",proposal)
  return (
    <>
      <div className="mt-[-105px] mx-auto  max-w-[1400px] py-60">
        {
          (loader)?<div class="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
            <span class="text-blue-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0 text-3xl" style={{top: "50%"}}>
              Loading...
            </span>
          </div>
          :<div className="max-w-[1400px] h-fit grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 space-x-4">
          {proposal.map((item,index)=>(
            <div key={index}>
              <div class="  relative p-4  h-[500px]">
            <div class="flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md absolute top-60 left-2/4 w-full max-w-[20rem] md:max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
              <div class=" bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg -mt-6 mb-4 grid h-24 place-items-center">
                <h3 class="block antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-white">
                  {item[0]}
                </h3>
              </div>

              <div class="p-6 flex flex-col gap-4">
                <h1 className="font-bold text-sky-600 text-xl ">
                  {item[3]}
                </h1>
                <div>
                  {/* <p className="font-bold text-black/50 text-l">
                    A) Yes <span>(10%)</span>
                  </p>
                  <h1 className="font-bold text-black/50 text-l">
                    B) No <span>(12.34%)</span>
                  </h1>
                  <h1 className="font-bold text-black/50 text-l">
                    C) None (77.66%)
                  </h1> */}
                  {/* <div class="bg-transparent relative rounded-[2rem] mt-0 py-4 mb-2 flex justify-between items-center">
                    <div class="bg-zinc-100 h-[20px] w-full absolute bottom-0 left-0 rounded-[2rem]">
                      <span class="text-xs text-center absolute left-[40%] md:left-[45%] py-0.5 font-semibold z-20 text-black/50">
                        77.66% Sold
                      </span>
                      <div
                        class="py-1 w-full h-full  bg-gradient-to-tr from-blue-600 to-blue-400 relative rounded-[2rem] w-[20%]"
                        style={{ width: "77.66%" }}
                      ></div>
                    </div>
                  </div> */}
                </div>
                <div>
                  <div className=" w-full flex justify-between items-center text-black/50 font-semibold">
                    {/*show active status */}
                    
                      <p className="font-bold text-black/50 text-l">
                        Status:{" "}
                      </p>
                      <p className="font-bold text-black/50 text-l">
                        {checkActive(item[1],item[2])}
                      </p>
                    
                  </div>
                </div>
              </div>
              <div class="p-6 ">
                <NavLink to={`/details/${index}`}>
                  <button
                    class="my-2 middle none font-sans font-bold center capatelize  transition-all  text-xs py-5 px-6 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] block w-full"
                    type="button"
                  >
                    Details
                  </button>
                </NavLink>
                {isOwner?
                <NavLink to={`/editproposal/${index}`}>
                  <button
                    class="my-2 middle none font-sans font-bold center capatelize  transition-all  text-xs py-5 px-6 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] block w-full"
                    type="button"
                  >
                    Edit
                  </button>
                </NavLink>
                :""}
              </div>
            </div>
          </div>
            </div>
          ))}
        </div>
        }
        
      </div>
    </>
  );
};

export default Card;