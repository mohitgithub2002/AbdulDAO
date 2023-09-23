import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import {contract} from "../connectContract"
export const Details = () => {
  const { id } = useParams();
  const[title,setTitle] = useState();
  const [question, setQuestion] =useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [options,setOptions] = useState([]);
  const [votes, setVotes] = useState([]);
  const [totalVotes, setTotalVotes] = useState();
  const [isActive, setIsActive] = useState();
  const [voteValue, setVoteValue] = useState();
  // const [max,setMax] = useState();
  const [result,setresult] =useState();
  const getData = async ()=>{
      const data = await contract.getProposalById(id);
      console.log(data)
      setTitle(data[0]);
      setQuestion(data[3]);
      const startdate = new Date(Number(data[1])*1000);
      const now =  Date.now();
      const nowtime  = new Date(now);
      const enddate = new Date(Number(data[2])*1000);
      console.log("dates",startdate,enddate,now)
      //status
      let status = false;
      if(now>=(Number(data[1])*1000)&&now<=(Number(data[2])*1000)){
        setIsActive(true);
      }
      if(now<=(Number(data[2])*1000)) status = true;
      
      
      //dates
      setStartDate(startdate.toLocaleString())
      setEndDate(enddate.toLocaleString())
      console.log("now",nowtime);
      //options
      const option = [];
      for(let i=0;i<data[4].length;i++){
        option.push(data[4][i])
      }
      setOptions(option);

      //votes by option
      const votes = []
      let maxvalue =0;
      let max = 0;
      let total =0;
      
      for (let i = 0; i < data[5].length; i++) {
        const element = data[5][i];
        votes.push(Number(element));
        total += Number(element);
        if(Number(element)>maxvalue) if(maxvalue===0){max =i;} maxvalue=Number(element);
      }
      
      setTotalVotes(total);
      setVotes(votes);
      //result
      (!status)?setresult(data[4][max]):setresult("Not declared Yet");
      
  }
  useEffect(() => {
      getData();
  }, [isActive]);
  console.log("options",options)
  console.log("votes",votes)
  console.log(totalVotes);

  
  const vote = async(index)=>{
    try{
      if(!voteValue) alert("please enter value"); return;
      const res =  await contract.userVoteByProposalId(id,index,voteValue);
      await res.wait();
      alert("voted successfully")
      setVoteValue("");
    }catch(error){
      console.log(error)
      alert(error.reason)
    }
    
  }

  return (
    <>
      <div className="px-3 py-4  pb-20  mt-20">
        <div className="max-w-4xl mx-auto rounded-lg grid overflow-x-auto filter  bg-white pb-10  relative">
          {/* <div className="absolute top-0 left-0 backgrouds w-full  .radius   mt-0 mb-4 grid h-6  "></div> */}
          <div className="absolute w-[96%]  bg-clip-border mx-4 rounded-xl  bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg mt-4 mb-4 grid h-28  place-items-center">
            <h3 className="block antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-white">
              {title}
            </h3>
          </div>

          <div className="mt-32 items-center">
            <h2 className="text-sky-600 my-1 font-bold text-xl p-5 py-2">
              {question}
            </h2>
          </div>

          <table className="w-full">
            <tbody className="">
              <tr className="hover:bg-sky-200">
                <td className="">Status</td>
                <td
                  className="text-green-500"
                  style={{ overflowWrap: "break-word" }}
                >
                  {isActive?"Active":"Not Active"}
                </td>
              </tr>

              <tr className="hover:bg-sky-200">
                <td className="">Starting at</td>
                <td className="" style={{ overflowWrap: "break-word" }}>
                  {startDate}
                </td>
              </tr>

              <tr className="hover:bg-sky-200">
                <td className="">Ending at</td>
                <td className="" style={{ overflowWrap: "break-word" }}>
                  {endDate}
                </td>
              </tr>

              <tr className="hover:bg-sky-200">
                <td className="">Current Voting Power</td>
                <td className="" style={{ overflowWrap: "break-word" }}>
                  15,000
                </td>
              </tr>

              <tr className="hover:bg-sky-200">
                <td className="">Result</td>
                <td className="" style={{ overflowWrap: "break-word" }}>
                  {result}
                </td>
              </tr>
              </tbody>
          </table>  
          <table className="w-full">
            <tbody >
              {options.map((item,index)=> (
                <tr key={index} className="hover:bg-sky-200">
                  <td className=" ">
                    <div className="flex justify-between">
                      <div>
                        {index+1}) <span>{item}</span>
                      </div>
                      <div>{votes[index]}</div>
                    </div>

                    <div class="bg-transparent relative rounded-[2rem] mt-0 py-4 mb-2 flex justify-between items-center">
                      <div class="bg-zinc-100 h-[20px] w-full absolute bottom-0 left-0 rounded-[2rem]">
                        <span class="text-xs text-center absolute left-[40%] md:left-[45%] py-0.5 font-semibold z-20 text-black/50">
                          {(votes[index])?(Number((votes[index]/totalVotes)*100)).toFixed(2):"0"}% Sold
                        </span>
                        <div
                          class="py-1 w-full h-full  bg-gradient-to-tr from-blue-600 to-blue-400 relative rounded-[2rem] "
                          style={{ width: `${(votes[index])?(votes[index]/totalVotes)*100:"0"}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>

                  <td className="" style={{ overflowWrap: "break-word" }}>
                    <div className=" gjhMie">
                      <span></span>
                      <div class="flex items-center  w-full min-w-[200px] h-16">
                        <input
                          type="number"
                          class="peer w-[200px]  bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent  text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-blue-500"
                          placeholder=" "
                          onChange={(e)=>{setVoteValue(e.target.value)}}
                        />
                        <button
                          class="middle none font-sans font-bold center capatelize  transition-all  text-xs py-2 px-2 mx-5 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] block w-[50px]"
                          type="button"
                          disabled={!isActive}
                          onClick={()=>vote(index)}
                        >
                          Vote
                        </button>
                      </div>
                    </div>
                  </td>
              </tr>
              ))}
              
 
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
