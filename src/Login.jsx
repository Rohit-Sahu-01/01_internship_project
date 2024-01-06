import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
const Login = () => {
  // LOGIN STATE
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["token"]);
  const [data, setData] = useState({
    name: "",
    password:""
  });

  const [loginData, setLoginData] = useState();

  // LOGIN LOGIC
  const handleInput = (e) => {
    const { name, value } = e.target;

    setData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let findData = null;

    if (data.name == "") {
      return toast.error("PLEASE FILL  DETAILS");
    }

     else if (
      (findData = loginData.find((item) => item.username == data.name))
    ) {
      
      if(findData.password==data.password) {
          setCookies("token", findData.id);
          localStorage.setItem("username", findData.firstName);
          navigate("/home");
      }
      else{
          return alert("PLEASE ENTER RIGHT CREDENTIALS");
      }
     
    } else {
      return alert("PLEASE ENTER RIGHT CREDENTIALS");
    }
  };

  useEffect(() => {
      const fetchData=async()=>{
        try{
          const response=await axios.get('https://dummyjson.com/users')
          
          setLoginData(response.data.users)
     }
     catch(error){
      console.error(error)
     }
      }
      fetchData()
      
  }, []);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <nav className="bg-black text-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl text-center  mx-auto p-4">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            INTERNSHIP PROJECT
          </span>
        </div>
      </nav>

      <div className="">
        <div className="mt-10">
          <form className="max-w-md mx-auto " onSubmit={handleLogin}>
            <div className="m-10">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="name"
                  onChange={handleInput}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 dark:text-black focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Username
                </label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="password"
                  onChange={handleInput}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent dark:text-black border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
              </div>
              <button
                
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                LOG IN
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
