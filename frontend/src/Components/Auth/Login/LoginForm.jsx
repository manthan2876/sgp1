import { Form, Input, Button } from "antd";
import { jwtDecode } from "jwt-decode";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";
import {toast} from "react-hot-toast"

function LoginForm({
  handleGoogleLogin,
  isUser,
  setEmail,
  setPassword,
  loginData,
}) {

  const navigate = useNavigate();
  const { login, setUser, currUser } = useAuth();
  
  const handleLogin = async () => {
    navigate("/")
    await login(loginData);
    console.log(currUser)
    console.log("pda",currUser.isPDA)
    const token = localStorage.getItem("token");
   
    if (token) {
      const role = jwtDecode(token).role;
     
      if (role === "admin") {
        navigate("/admin");
      } else if (role == "postal") {
        navigate("/postal");
      } else if (currUser.isPDA) {
        navigate("/pda-user/add-info");
      } else {
        navigate("/")
      }
    }
  };

  const handlePostalLogin = async () => {
    console.log(loginData);
    const postalData = {"unique_id": loginData.email, "password": loginData.password};
    
    axios
      .post(`http://localhost:5000/api/postal-circles/login`, postalData)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        const token = localStorage.getItem("token");
        if (token) {
          const role = jwtDecode(token).role;
          setUser(role);
          toast.success("Login successful!");
          if (role === "admin") {
            navigate("/admin");
          } else if (role == "postalCircle") {
            navigate("/postal");
          } else if (role == "user") {
            navigate("/");
          }
        }
      })
      .catch((e) => console.log(e));
      // toast.error("Login failed. Please check your credentials!");
  };

  return (
    <Form layout="vertical" autoComplete="off">
      <Form.Item
        label={isUser ? "Email Id" : "Postal Id"}
        name="email"
        rules={[
          {
            required: true,
            message : isUser
              ? "Enter Email Id"
              : "Enter Postal Id",
          },
        ]}
        className="text-text-dark dark:text-text-dark"
      >
        <Input
          size="large"
          placeholder={
              isUser
              ? "Enter your Email ID"
              : "Enter your Postal ID"
          }
          className="bg-background-light dark:bg-background-dark border-input-light dark:border-input-dark text-text-light dark:text-text-dark dark:placeholder:text-accent-dark"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please enter your password",
          },
        ]}
      >
        <Input.Password
          size="large"
          placeholder="Enter your password"
          className="bg-background-light dark:bg-background-dark border-input-light dark:border-input-dark text-text-light dark:text-text-dark dark:placeholder:text-accent-dark"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>

      <div className="flex justify-between items-center">
        <Link className="text-accent-light dark:text-accent-dark text-sm">
          Forgot Password?
        </Link>
      </div>

      <Form.Item>
        <Button
          
          htmlType="submit"
          onClick={handleLogin}
          size="large"
          className="w-full bg-primary-dark dark:bg-accent-dark text-white dark:text-text-light mt-4"
        >
          Login
        </Button>
      </Form.Item>

      {isUser && (
        <div className="flex justify-center mt-4">
          <Button
            icon={<FaGoogle />}
            onClick={handleGoogleLogin}
            className="w-full flex items-center bg-google-bg text-white"
          >
            Sign in with Google
          </Button>
        </div>
      )}
    </Form>
  );
}

export default LoginForm;
