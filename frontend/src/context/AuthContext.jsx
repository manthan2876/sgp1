import { createContext, useState, useEffect, useContext } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import {toast} from "react-hot-toast"
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [temp, setTemp] = useState(0);
  const [currUser, setCurrUser] = useState();


  useEffect(() => {
    getCurrentUserDetails();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // setUser(user || null);
      setLoading(false);
    });
    const token = localStorage.getItem("token");
    // console.log(jwtDecode(token).role)
    if (token) {
      const role = jwtDecode(token).role;
      // getCurrentUserDetails()
      console.log(role)
      setUser(role);
    }
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const role = jwtDecode(token).role;
      setUser(role);
    }
  }, [temp]);

  const signUp = (formData) => {
    axios
      .post(`http://localhost:5000/api/auth/register`, formData)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        const role = jwtDecode(res.data.token).role;
        setUser(role);
        // if(res.data.isPDA) {
        //   navigate("/pda-user/add-info")
        // }
        toast.success(`Registration Successful`);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to register");
      });
  };

  const login = async (loginData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginData
      );
      console.log("inside authContext",response.data);
      localStorage.setItem("token", response.data.token);
      const token = localStorage.getItem("token");
      if (token) {
        const role = jwtDecode(token).role;
        setUser(role);
        toast.success("Login successful");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login Failed");
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const userInfo = {
        email: result.user.email,
        name: result.user.displayName,
        phone: result.user.phoneNumber || "", // Optional if not available
        password: "defaultPassword123", // Generate a default password for Google users
      };

      try {
        // Attempt to register the user
        const registerResponse = await axios.post(
          "http://localhost:5000/api/auth/register",
          userInfo,
          { withCredentials: true }
        );

        if (registerResponse.data.user) {
          setUser(registerResponse.data.user);
          toast.success("Registered successfully")
          Cookies.set("token", registerResponse.data.token, { expires: 7 });
        }
      } catch (registerError) {
        if (registerError.response && registerError.response.status === 400) {
          // User already exists, so log them in instead
          const loginResponse = await axios.post(
            "http://localhost:5000/api/auth/login",
            {
              email: userInfo.email,
              password: userInfo.password,
            },
            { withCredentials: true }
          );

          if (loginResponse.data.token) {
            setUser({ email: userInfo.email, name: userInfo.name });
            toast.success("Login successful")
            Cookies.set("token", loginResponse.data.token, { expires: 7 });
          }
        } else {
          console.error("Google sign-in error:", registerError);
          toast.error("Failed to Register");
        }
      }
    } catch (error) {
      console.error("Error with Google Sign-In:", error);
      toast.error("Failed to Register");
    }
  };

  // console.log(user)
  
  const getCurrentUserDetails = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found");
      return null;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      console.log(userId)

      const response = await axios.get(
        `http://localhost:5000/api/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(response.data);
      setCurrUser(response.data);
      console.log("User Details:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

  console.log(currUser)

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signUp,
        setTemp,
        setUser,
        login,
        currUser,
        getCurrentUserDetails,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
