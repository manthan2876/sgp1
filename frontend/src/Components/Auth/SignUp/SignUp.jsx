import { useEffect, useState } from "react";
import { Card, Typography, message } from "antd";
import SignUpForm from "./SignUpForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    emailOtp: "",
    phoneOtp: "",
    userType: "Normal User",
    isPDA: false, // Initially false, will be updated based on user role selection
  });

  const { currUser } = useAuth();
  console.log(currUser);
  const navigate = useNavigate();

  const handleFieldChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const sendEmailOtp = async (email) => {
    try {
      await axios.post("http://localhost:5000/api/auth/send-email-otp", {
        email,
      });
      message.success("OTP sent to your email!");
    } catch (error) {
      message.error("Failed to send OTP for email.");
    }
  };

  const verifyEmailOtp = async (email, otp) => {
    try {
      await axios.post("http://localhost:5000/api/auth/verify-email-otp", {
        email,
        otp,
      });
      message.success("Email verified successfully!");
    } catch (error) {
      message.error("Invalid email OTP.");
    }
  };

  const sendPhoneOtp = async (phone) => {
    try {
      await axios.post("http://localhost:5000/api/auth/send-otp", {
        phoneNumber: phone,
      });
      message.success("OTP sent to your phone!");
    } catch (error) {
      message.error("Failed to send OTP for phone.");
    }
  };

  const verifyPhoneOtp = async (phone, otp) => {
    try {
      await axios.post("http://localhost:5000/api/auth/verify-otp", {
        phoneNumber: phone,
        otp,
      });
      message.success("Phone verified successfully!");
    } catch (error) {
      message.error("Invalid phone OTP.");
    }
  };

  const handleSignUp = async (signUpData) => {
    const { emailOtp, phoneOtp, userType, ...cleanedData } = signUpData;

    // Set isPDA based on the user role (PDA User or Normal User)
    signUpData.isPDA = userType === "PDA User";
    console.log(signUpData);

    try {
      await axios
        .post("http://localhost:5000/api/auth/register", signUpData)
        .then((res) => {
          console.log(res.data);
        });
      message.success("Account created successfully!");

      navigate("/auth/login");
    } catch (error) {
      message.error("Error creating account.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark mt-5 md:mt-0">
      <div className="w-full max-w-md px-4">
        <Card className="bg-white dark:bg-background-dark dark:text-text-dark shadow-lg dark:shadow-shadow-dark">
          <div className="flex flex-col">
            <Typography.Title
              level={2}
              strong
              className="text-center !text-black dark:!text-text-dark"
            >
              Create an Account
            </Typography.Title>
            <Typography.Text
              type="secondary"
              strong
              className="text-center mb-4 !text-black dark:!text-text-dark"
            >
              Join us and get started!
            </Typography.Text>

            <SignUpForm
              formData={formData}
              handleChange={(e) =>
                handleFieldChange(e.target.name, e.target.value)
              }
              handleSignUp={handleSignUp}
              sendEmailOtp={sendEmailOtp}
              verifyEmailOtp={verifyEmailOtp}
              sendPhoneOtp={sendPhoneOtp}
              verifyPhoneOtp={verifyPhoneOtp}
            />
          </div>
        </Card>
      </div>
    </section>
  );
}

export default SignUp;
