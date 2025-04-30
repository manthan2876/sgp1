exports.generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  
  exports.isOTPExpired = (expiryTime) => {
    return Date.now() > expiryTime;
  };