import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Auth/Login/Login";

import SignUp from "./Components/Auth/SignUp/SignUp";
import Home from "./Components/Hero/Home/Home";
import AllNewsPage from "./Components/News/AllNewsPage";

import NewsDetailPage from "./Components/News/NewsDetailPage";
import AllItemsPage from "./Components/Items/Stamps/AllItemsPage";

import StampDetailsPage from "./Components/Items/Stamps/StampDetailsPage";
import GuestLayout from "./Layouts/GuestLayout";



import MyCart from "./Components/Items/AddToCart/MyCart";



import Community from "./Components/Community/Community";
import Profile from "./Components/Community/Profile";



import { Toaster } from "react-hot-toast";


import Loader from "./UI/Loader";
import { useState, useEffect } from "react";

const App = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }
   
  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route path="/" element={<GuestLayout />}>
          <Route index element={<Home />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="user/signup" element={<SignUp />} />
          <Route path="all-news" element={<AllNewsPage />} />
          <Route path="all-news/:id" element={<NewsDetailPage />} />
          <Route path="all-items" element={<AllItemsPage />} />
          <Route path="items/stamp/:id" element={<StampDetailsPage />} />
          <Route path="items/my-cart" element={<MyCart />} />
          <Route path="community" element={<Community />} />
          <Route path="community/profile" element={<Profile />} />

        </Route>


        

        
      </Routes>
    </Router>
  );
};
export default App;
