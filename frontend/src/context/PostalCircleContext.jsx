import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const PostalCircleContext = createContext();
export const usePostalCircle = () => useContext(PostalCircleContext);

export const PostalCircleProvider = ({ children }) => {
  const [postalCircles, setPostalCircles] = useState([]);
  const token = localStorage.getItem("token");
  
  useEffect(() => {

    // console.log("inside postalCircleContext:", token);
    
    axios.get(`http://localhost:5000/api/admin/allpostCircleDetail`,{
      headers: {
        Authorization: `Bearer ${token}`, // Add token to the Authorization header
      },
    }).then((res)=>{
      setPostalCircles(res.data.postalCircles);
    })
  }, []);

  // console.log(postalCircles)

  const value = {
    postalCircles,
  };

  return (
    <PostalCircleContext.Provider value={value}>
      {children}
    </PostalCircleContext.Provider>
  );
};
