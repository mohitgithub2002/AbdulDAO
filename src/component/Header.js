import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import {contract} from "../connectContract";
import Cookies from "js-cookie";
const Header = ({ userAddress, onConnectWallet }) => {
  
  const[ isOwner,setIsOwner] = useState(false);
  const [user,setUser]= useState();
  useEffect(() => {
    // Check if the user is authenticated
    const userData = Cookies.get("user");
    if(userData){
      setUser(JSON.parse(userData).user_id);
    }
    
    
  }, []);

  const { ethereum } = window;
  useEffect(async()=>{
    try{
      if(window.ethereum !== undefined){
      const accounts = await ethereum.request({method: 'eth_requestAccounts'});
      userAddress = accounts[0]
      
      }
      
    }catch(error){
      console.log(error)
      
    }
  },[])

  const data =  async ()=>{
    try {
      const user = await contract.methods.owner().call();
      if (userAddress === user.toLowerCase()) {
        setIsOwner(true);
        console.log('Owner is', user);
      } else {
        setIsOwner(false);
      }
    } catch (error) {
      console.error(error);
    }
    
  }
  useEffect(()=>{
    data()
  },[userAddress])
  const [toggle, setToggle] = useState(false);
  const handleLogout=()=>{
    Cookies.remove("user")
    window.location.href = "/login"
  }
  return (
    <>
      <div className="">
        <div className="z-100 ">
          <header className="">
            <nav className="mx-auto flex items-center justify-between gap-x-6 p-6 max-w-screen lg:px-20">
              <div className="flex justify-center items-center">
                <a
                  className="-m-1.5 p-1.5  text-blue-sky font-bold text-5xl flex justify-center items-center "
                  href="/"
                >
                  <span className="sr-only">Your Company</span>
                  logo
                </a>
              </div>

              <div className="md:flex justify-center items-center space-x-10 hidden">
                <div className="flex justify-between items-center space-x-10 font-bold text-xl  ">
                  <div>
                    <NavLink to="/"> Home</NavLink>{" "}
                  </div>
                  <div>
                    <NavLink to="/card"> Claim</NavLink>{" "}
                  </div>

                  {isOwner ? (
                    <div>
                    <NavLink to="/add-proposal"> Add Proposal</NavLink>
                  </div>
                  ) : ""}
                  
                  
                  {user ? (
                    <button onClick={handleLogout}>
                      Logout ({user})
                    </button>
                  ) : ""}
                </div>
                <div className="items-center justifybox height same and content size same, Its difficult to manage the ssection becuase images sizes is too much, if i set the images its look strechable -end  gap-x-4 lg:flex xl:gap-x-8">
                  <button className="rounded-md text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-sm bg-transparent font-bold borde py-3 px-4 text-[10px] xl:py-4 xl:px-8 xl:text-sm transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-300"
                    onClick = {onConnectWallet} 
                  >
                    {userAddress? `${userAddress.substring(0,4)}....${userAddress.substring(((userAddress.length)-4),(userAddress.length))}`:"Connect to Metamask" }
                  </button>
                </div>
              </div>
              <div className="flex lg:hidden">
                <button
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  <span className="sr-only">Open main menu</span>
                  <span className="w-fit">
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </nav>

            {toggle && (
              <div className="lg:hidden">
                <div className="fixed inset-y-0 right-0 z-50 w-full bg-black px-6 py-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                  <div className="gap-x-6 flex justify-between">
                    <a className="-m-1.5 p-1.5" href="/">
                      <span className="sr-only">Your Company</span>
                      Tito
                    </a>
                    <button
                      className="-m-2.5 rounded-md p-2.5 text-white"
                      onClick={() => {
                        setToggle(!toggle);
                      }}
                    >
                      <span className="sr-only">Close menu</span>
                      <span className="w-fit">
                        <svg
                          className="h-8 w-8"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                  <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
                      <div className="space-y-2 py-6">
                        <NavLink
                          to="/"
                          className="-mx-3 active:text-white block rounded-lg px-3 py-2 text-xl font-semibold leading-7 text-blacks text-white "
                          onClick={() => {
                            setToggle(!toggle);
                          }}
                        >
                          Home
                        </NavLink>
                        <NavLink
                          to="/card"
                          className="-mx-3 active:text-white block rounded-lg px-3 py-2 text-xl font-semibold leading-7 text-blacks text-white "
                          onClick={() => {
                            setToggle(!toggle);
                          }}
                        >
                          Proposal
                        </NavLink>
                        {isOwner ? (
                          <div>
                          <NavLink to="/add-proposal"
                            className="-mx-3 active:text-white block rounded-lg px-3 py-2 text-xl font-semibold leading-7 text-blacks text-white "
                            onClick={() => {
                              setToggle(!toggle);
                            }}
                          > Add Proposal</NavLink>
                        </div>
                        ) : ""}

                        <NavLink
                          to="/login"
                          className="-mx-3 active:text-white block rounded-lg px-3 py-2 text-xl font-semibold leading-7 text-blacks text-white "
                          onClick={() => {
                            handleLogout();
                            setToggle(!toggle);
                          }}
                        >
                          Logout (<span>{user}</span>)
                        </NavLink>
                        
                      </div>
                      <div className="flex flex-1 items-center gap-x-6 py-6">
                        
                        <button className="rounded-md text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-sm bg-transparent font-bold borde py-3 px-4 text-[10px] xl:py-4 xl:px-8 xl:text-sm transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-300"
                          onClick = {onConnectWallet} 
                        >
                          {userAddress? `${userAddress.substring(0,4)}....${userAddress.substring(((userAddress.length)-4),(userAddress.length))}`:"Connect to Metamask" }
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </header>
        </div>
      </div>
    </>
  );
};

export default Header;
