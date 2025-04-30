import { useState } from "react";
import { Card, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import ToggleRole from "../ToggleRole";
import LoginForm from "./LoginForm";
import { useAuth } from "../../../context/AuthContext";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginStatus, setLoginStatus] = useState(false)
  const [isUser, setIsUser] = useState(true);
  const { signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  const handleFieldChange = (field, value) => {
    setLoginData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      message.success("Login successful!");
      navigate("/");
    } catch (e) {
      message.error("Failed to log in with Google.");
    }
  };

  return (
    <section className="section-login bg-background-light dark:bg-background-dark py-[2.6rem] flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <Card className="form-container bg-white dark:bg-background-dark shadow-lg dark:shadow-shadow-dark">
          <div className="flex flex-col text-text-light dark:text-text-dark">
            <Typography.Title
              level={2}
              className="text-center !text-black dark:!text-text-dark"
            >
              Welcome Back!
            </Typography.Title>
            <Typography.Text
              type="secondary"
              className="text-center mb-4 !text-black dark:!text-text-dark"
            >
              Connect, Collect, Explore!
            </Typography.Text>

            <ToggleRole isUser={isUser} setIsUser={setIsUser} />

            <LoginForm
              isUser={isUser}
              handleGoogleLogin={handleGoogleLogin}
              setEmail={(value) => handleFieldChange("email", value)}
              setPassword={(value) => handleFieldChange("password", value)}
              loginData={loginData}
            />

            {isUser &&  (
              <Typography.Text className="text-center mt-4 text-primary-dark dark:text-primary-light">
                Don't have an account?
                <Link
                  to="/user/signup"
                  className="!text-accent-light dark:!text-accent-dark ml-1"
                >
                  Signup
                </Link>
              </Typography.Text>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}
export default Login;
