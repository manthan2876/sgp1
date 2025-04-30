import { useState } from "react";

function SignUpForm({
  handleSignUp,
  sendEmailOtp,
  sendPhoneOtp,
  verifyEmailOtp,
  verifyPhoneOtp,
  formData,
  handleChange
}) {
  const [emailOtpVisible, setEmailOtpVisible] = useState(false);
  const [phoneOtpVisible, setPhoneOtpVisible] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your full name";
    if (!formData.email.trim()) newErrors.email = "Please enter your email";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email address";
    if (!formData.phone.trim()) newErrors.phone = "Please enter your phone number";
    if (!formData.password.trim()) newErrors.password = "Please enter your password";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      handleSignUp(formData);
    }
  };

  const handleEmailOtpVerification = async () => {
    try {
      await verifyEmailOtp(formData.email, formData.emailOtp);
      setEmailOtpVisible(false); // Close OTP input field after successful verification
    } catch (error) {
      console.error("Error verifying email OTP", error);
    }
  };

  const handlePhoneOtpVerification = async () => {
    try {
      await verifyPhoneOtp(formData.phone, formData.phoneOtp);
      setPhoneOtpVisible(false); // Close OTP input field after successful verification
    } catch (error) {
      console.error("Error verifying phone OTP", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="dark:text-text-dark">
      {/* Full Name */}
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="input"
        />
      </div>

      {/* Email */}
      <div className="form-group">
        <label>Email Id</label>
        <div className="input-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="input"
          />
          <button
            type="button"
            onClick={() => {
              sendEmailOtp(formData.email);
              setEmailOtpVisible(true);
            }}
            className="btn"
          >
            Verify
          </button>
        </div>
        {emailOtpVisible && (
          <div>
            <input
              type="text"
              name="emailOtp"
              value={formData.emailOtp}
              onChange={handleChange}
              placeholder="Enter OTP"
              className="input mt-2"
            />
            <button
              type="button"
              onClick={handleEmailOtpVerification}
              className="btn mt-2"
            >
              Verify OTP
            </button>
          </div>
        )}
      </div>

      {/* Phone */}
      <div className="form-group">
        <label>Phone Number</label>
        <div className="input-group">
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="input"
          />
          <button
            type="button"
            onClick={() => {
              sendPhoneOtp(formData.phone);
              setPhoneOtpVisible(true);
            }}
            className="btn"
          >
            Verify
          </button>
        </div>
        {phoneOtpVisible && (
          <div>
            <input
              type="text"
              name="phoneOtp"
              value={formData.phoneOtp}
              onChange={handleChange}
              placeholder="Enter OTP"
              className="input mt-2"
            />
            <button
              type="button"
              onClick={handlePhoneOtpVerification}
              className="btn mt-2"
            >
              Verify OTP
            </button>
          </div>
        )}
      </div>

      {/* Password */}
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="input"
        />
      </div>

      {/* User Role Dropdown */}
      <div className="form-group">
        <label>User Role</label>
        <select
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          className="input"
        >
          <option value="Normal User">Normal User</option>
          <option value="PDA User">PDA User</option>
        </select>
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn w-full">
        Sign Up
      </button>
    </form>
  );
}

export default SignUpForm;
