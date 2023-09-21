import React from "react";

export const Details = () => {
  return (
    <>
      <div className="px-3 py-4  pb-20  mt-20">
        <div className="max-w-4xl mx-auto rounded-lg grid overflow-x-auto filter  bg-white pb-10  relative">
          {/* <div className="absolute top-0 left-0 backgrouds w-full  .radius   mt-0 mb-4 grid h-6  "></div> */}
          <div className="absolute w-[96%]  bg-clip-border mx-4 rounded-xl  bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg mt-4 mb-4 grid h-28  place-items-center">
            <h3 className="block antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-white">
              P2P System
            </h3>
          </div>

          <div className="mt-32 items-center">
            <h2 className="text-sky-600 my-1 font-bold text-xl p-5 py-2">
              Do you want P2P System ?
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
                  Active
                </td>
              </tr>

              <tr className="hover:bg-sky-200">
                <td className="">Starting at</td>
                <td className="" style={{ overflowWrap: "break-word" }}>
                  21/03/2023, 20:00
                </td>
              </tr>

              <tr className="hover:bg-sky-200">
                <td className="">Ending at</td>
                <td className="" style={{ overflowWrap: "break-word" }}>
                  23/03/2023, 21:00
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
                  Not declared yet
                </td>
              </tr>

              <tr className="hover:bg-sky-200">
                <td className=" ">
                  <div className="flex justify-between">
                    <div>
                      A) <span>Yes</span>
                    </div>
                    <div>2300</div>
                  </div>

                  <div class="bg-transparent relative rounded-[2rem] mt-0 py-4 mb-2 flex justify-between items-center">
                    <div class="bg-zinc-100 h-[20px] w-full absolute bottom-0 left-0 rounded-[2rem]">
                      <span class="text-xs text-center absolute left-[40%] md:left-[45%] py-0.5 font-semibold z-20 text-black/50">
                        77.66% Sold
                      </span>
                      <div
                        class="py-1 w-full h-full  bg-gradient-to-tr from-blue-600 to-blue-400 relative rounded-[2rem] "
                        style={{ width: "77.66%" }}
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
                      />
                      <button
                        class="middle none font-sans font-bold center capatelize  transition-all  text-xs py-2 px-2 mx-5 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] block w-[50px]"
                        type="button"
                      >
                        Vote
                      </button>
                    </div>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-sky-200">
                <td className=" ">
                  <div className="flex justify-between">
                    <div>
                      B) <span>No</span>
                    </div>
                    <div>450</div>
                  </div>

                  <div class="bg-transparent relative rounded-[2rem] mt-0 py-4 mb-2 flex justify-between items-center">
                    <div class="bg-zinc-100 h-[20px] w-full absolute bottom-0 left-0 rounded-[2rem]">
                      <span class="text-xs text-center absolute left-[40%] md:left-[45%] py-0.5 font-semibold z-20 text-black/50">
                        77.66% Sold
                      </span>
                      <div
                        class="py-1 w-full h-full  bg-gradient-to-tr from-blue-600 to-blue-400 relative rounded-[2rem] "
                        style={{ width: "77.66%" }}
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
                      />
                      <button
                        class="middle none font-sans font-bold center capatelize  transition-all  text-xs py-2 px-2 mx-5 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] block w-[50px]"
                        type="button"
                      >
                        Vote
                      </button>
                    </div>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-sky-200">
                <td className=" ">
                  <div className="flex justify-between">
                    <div>
                      C) <span>None</span>
                    </div>
                    <div>200</div>
                  </div>

                  <div class="bg-transparent relative rounded-[2rem] mt-0 py-4 mb-2 flex justify-between items-center">
                    <div class="bg-zinc-100 h-[20px] w-full absolute bottom-0 left-0 rounded-[2rem]">
                      <span class="text-xs text-center absolute left-[40%] md:left-[45%] py-0.5 font-semibold z-20 text-black/50">
                        77.66% Sold
                      </span>
                      <div
                        class="py-1 w-full h-full  bg-gradient-to-tr from-blue-600 to-blue-400 relative rounded-[2rem] "
                        style={{ width: "77.66%" }}
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
                      />
                      <button
                        class="middle none font-sans font-bold center capatelize  transition-all  text-xs py-2 px-2 mx-5 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] block w-[50px]"
                        type="button"
                      >
                        Vote
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
