import React, { useEffect, useState } from "react";
import {Address, contract, contractAbi} from "../connectContract"
import { useParams } from 'react-router-dom';
import { BsPlusCircle } from "react-icons/bs";
import Web3 from "web3";
const EditProposal = () => {
    const { id } = useParams();
    const web3 = new Web3(window.ethereum);
  const [topic,setTopic] = useState();
  const [startTime,setStartTime] = useState();
  const [endTime,setEndTime] = useState();
  const [question,setQuestion] = useState();
  const [options,setOptions] = useState(["",""]);
  const addOption = () => {
    const newOptions = [...options];
    newOptions.push("");
    setOptions(newOptions);
  };
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  const getData = async()=>{
    try{
    const mainContract = new web3.eth.Contract(contractAbi,Address)
    const data = await mainContract.methods.getProposalById(id).call();
    console.log(data);
    setTopic(data[0]);
    setQuestion(data[3]);
    // const startdate = new Date(Number(data[1])*1000);
    
    // const enddate = new Date(Number(data[2])*1000);
    // setStartTime(startdate.toLocaleString())
    // setEndTime(enddate.toLocaleString())
    const option = [];
      for(let i=0;i<data[4].length;i++){
        option.push(data[4][i])
      }
    setOptions(option);
    }catch(error){
      console.log(error);
    }

  }
  useEffect(()=>{
    getData()
  },[id])
  
  const starttime = (time)=>{
    const date = new Date(time)
    const timestamp = date.getTime();
    setStartTime(timestamp/1000)
  }
  const endtime = (time)=>{
    const date = new Date(time)
    const timestamp = date.getTime();
    setEndTime(timestamp/1000)
  }
  // const handelsubmit =async()=>{
  //   const res = await contract.methods.editProposalById(id,topic,startTime,endTime,question,options).send({from:window.ethereum.selectedAddress});
  //   let encoded_tx = res.encodeABI();
  //   let gasPrice = await web3.eth.getGasPrice();
  //   let gasLimit = await web3.eth.estimateGas({
  //     gasPrice: web3.utils.toHex(gasPrice),
  //     to: Address,
  //     from: window.ethereum.selectedAddress,
  //     data: encoded_tx,
  //     value: "0x" 
  //   });
  //   let trx = await web3.eth.sendTransaction({
  //     gasPrice: web3.utils.toHex(gasPrice),
  //     gas: web3.utils.toHex(gasLimit),
  //     to: Address,
  //     from: window.ethereum.selectedAddress,
  //     data: encoded_tx,
  //     value: "0x", //ethers.utils.parseUnits(inputAmount,18)
  //   });
  //   console.log(gasLimit);
  //   console.log(res);
  //   console.log(res);
  //   alert("Proposal edited succesfully");
  // }
  const handelsubmit = async () => {
    console.log(id,topic,startTime, endTime,question,options )
    try {
      const res = await contract.methods
        .editProposalById(id, topic, startTime, endTime, question, options)
        .send({ from: window.ethereum.selectedAddress });
      
      
      console.log(res);
      alert('Proposal edited successfully');
    } catch (error) {
      console.error('Error submitting proposal:', error);
      // Handle errors as needed
    }
  };
  
  return (
    <>
      <div class="relative min-h-screen  w-full ">
        <div class="absolute inset-0 z-0 h-full w-full "></div>
        <div class="container mx-auto  ">
          <div class="flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md absolute top-2/4 left-2/4  w-full sm:max-w-[32rem] max-w-[20rem] -translate-y-2/4 -translate-x-2/4">
            <div class="relative bg-clip-border mx-4 my-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg  mb-4 grid h-28 place-items-center">
              <h3 class="block antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-white">
                Edit Proposal (OnlyOwner)
              </h3>
            </div>
            <div class="p-6 flex flex-col gap-4">
              <div class="relative w-full min-w-[200px] h-16">
                <input
                  type="text"
                  class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-md px-3 py-3 rounded-md border-blue-gray-200 focus:border-blue-500"
                  placeholder=" "
                  value={topic}
                  onChange={(e)=>setTopic(e.target.value)}
                />
                <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-[18px] text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">
                  Topic
                </label>
              </div>
              <div class="relative w-full min-w-[200px] h-16">
                <input
                  type="datetime-local"
                  class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-blue-500"
                  placeholder=" "
                  
                  onChange={(e)=>starttime(e.target.value)}
                />
                <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-[18px] text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">
                  Start Time
                </label>
              </div>
              <div class="relative w-full min-w-[200px] h-16">
                <input
                  type="datetime-local"
                  class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-blue-500"
                  placeholder=" "
                  
                  onChange={(e)=>endtime(e.target.value)}
                />
                <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-[18px] text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">
                  End Time
                </label>
              </div>
              <div class="relative w-full min-w-[200px] h-16">
                <input
                  type="text"
                  class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-blue-500"
                  placeholder=" "
                  value={question}
                  onChange={(e)=>setQuestion(e.target.value)}
                />
                <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-[18px] text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">
                  Question
                </label>
              </div>
              <div className="overflow-y-auto max-h-40">
                {options.map((option,index)=>(
                  <div class="relative w-full min-w-[200px] h-16">
                  <input
                    type="text"
                    class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-blue-500"
                    placeholder=" "
                    value={option}
                    onChange={(e)=>handleOptionChange(index,e.target.value)}
                  />
                  <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-[18px] text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">
                    Options {index+1}
                  </label>
                </div>
               ))}
              </div> 
              <button
                  type="button"
                  className="flex items-center text-blue-500 hover:text-blue-700 cursor-pointer"
                  onClick={addOption}
                >
                  <BsPlusCircle className="w-6 h-6 mr-1" /> Add Option
                </button>

              {/* <div class="relative w-full min-w-[200px] h-16">
                <input
                  type="text"
                  class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-blue-500"
                  placeholder=" "
                />
                <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-[18px] text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">
                  Options B
                </label>
              </div> */}
            </div>
            <div class="p-6 pt-0">
              <button
                class="middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xl py-3 px-6 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] block w-full"
                type="button"
                onClick={handelsubmit}
              >
                Edit Proposal
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProposal;
