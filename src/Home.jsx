import React, { useEffect } from "react";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { BiCartAlt } from "react-icons/bi";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [allProduct,setAllProduct]=useState([])
  const [searchData, setSearchData] = useState();
  const [addToCart, setAddToCart] = useState([]);
  const [userName, setUserName] = useState("");
  const [price,setPrice]=useState()

  const handleInputChange = (e) => {
    const sData = e.target.value;
    setSearchData(sData);
    const filterProduct = allProduct.filter((item) =>
      item.title.toLowerCase().includes(sData.toLowerCase())
    );
    setData(filterProduct);
  };

  const handlePriceChange = (e) => {
    const sPrice = e.target.value;
   
      const filterProduct = allProduct.filter(
        (item) => item.price < sPrice
      );
      setData(filterProduct);
    

    setPrice(sPrice)
  };

  const handleAddToCart = (id) => {
    const cD = addToCart.find((item) => item.id == id);
    if (cD) {
      toast.error("ITEM ALREADY ADDED");

    } else {
      const AddCart = data.filter((item) => item.id == id);
      setAddToCart((prev) => [...prev, AddCart[0]]);
    }
  };

  const [cookies, , removeCookie] = useCookies(["token"]);

  useEffect(() => {
    const redirectTo = cookies.token ? "/home" : "/";
    navigate(redirectTo);
    setUserName(localStorage.getItem("username"));
  }, [navigate]);

  const handleLogOut = () => {
    toast.success('Log Out')
    removeCookie("token");
    sessionStorage.clear()
    navigate("/");
  };


  useEffect(() => {
    const fetchData=async()=>{
      try{
        const response=await axios.get('https://dummyjson.com/products')
        setAllProduct(response.data.products)
        setData(response.data.products)
        console.log(allProduct)
   }
   catch(error){
    console.error(error)
   }
    }
    fetchData()
}, []);



  return (
       <>
   <Toaster
  position="top-right"
  reverseOrder={false}
/>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex justify-around  mx-auto p-4">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            INTERNSHIP PROJECT
          </span>

          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                onChange={handleInputChange}
                
                className="block w-50 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search ..."
                required
              />

          
            </div>
          </span>

          <div>
          <div className="relative mb-6">
    <label htmlFor="labels-range-input" className="sr-only">Labels range</label>
    <input id="labels-range-input" type="range" min="0" name="price" onChange={handlePriceChange} max="1000" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>

    <span className="text-xs text-gray-800 dark:text-gray-400 absolute start-0 -bottom-6">Below - {price} Rs.</span>

</div>
          </div>
          <div className="flex">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Hello 👋 {userName}
            </span>
            <BiCartAlt className="ms-4 mt-2 dark:text-white" style={{ fontSize: "2rem" }} />{" "}
            <p className="text-2xl ms-1 mt-2 dark:text-white">{addToCart.length}</p>
            <button onClick={handleLogOut} className="text-white bg-blue-700 ms-10 mt-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              LOG OUT
            </button>
          </div>
        </div>
      </nav>

      <div className="flex flex-wrap">
        {data.length == 0 ? (
          <div className="mx-auto"><p className="text-3xl mt-8 font-semibold text-center">NO PRODUCTS</p></div>
        ) : (
          data.map((item) => {
            return (
              <div key={item.id} className="w-full max-w-sm  bg-white ms-8 mb-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img
                    className="p-8 rounded-t-lg"
                    src={item.images[0]}
                    style={{ height: "250px" }}
                    alt="product image"
                  />
                </a>
                <div className="px-5 pb-5">
                  <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight font-bold text-gray-900 dark:text-white">
                      {item.title}
                    </h5>
                  </a>
                  <h2 className="text-sm mt-2 mb-2">{item.description}</h2>
                  <div className="flex items-center mt-2.5 mb-5">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse"></div>
                    <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-0">
                      {item.brand}
                    </span>

                    <span className="bg-blue-100 ms-6 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-0">
                      Rating - 5.0/{item.rating}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {item.price} Rs.
                    </span>
                    <button
                      onClick={() => handleAddToCart(item.id)}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Home;
