import { useState } from "react";
import { LoginFormControl, LoginFormInitials } from "../../config/formFields";
import FormControls from "../../components/common/common-Form/FormControl";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { generateOtp, verifyOtp, loginUser } from "../../store/auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

const Login = () => {
  const [loginFormData, setLoginFormData] = useState(LoginFormInitials);
  const [otpSent, setOtpSent] = useState(false); // Track OTP sent status
  const [otpVerified, setOtpVerified] = useState(false); // ✅ Fix verification state
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();

    if (!loginFormData.email || !loginFormData.password || !loginFormData.otp) {
      toast.error("All fields, including OTP, are required!");
      return;
    }

    dispatch(loginUser(loginFormData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
      } else {
        toast.error(data?.payload?.message);
      }
    });
  }

  function isFormValid() {
    return Object.values(loginFormData).every((value) => value.trim() !== "");
  }

  function isOtpButtonDisabled() {
    return !(loginFormData.email.trim() && loginFormData.password);
  }

  function handleGenerateOTP() {
    dispatch(
      generateOtp({
        email: loginFormData.email,
        password: loginFormData.password,
      })
    ).then((res) => {
      if (res.payload?.success) {
        toast.success("OTP Sent");
        setOtpSent(true); // ✅ Mark OTP as sent
        setOtpVerified(false); // ❌ Do NOT mark OTP as verified yet
      } else {
        toast.error(res.payload?.message || "Failed to send OTP");
      }
    });
  }

  function handleVerifyOTP() {
    dispatch(
      verifyOtp({
        email: loginFormData.email,
        otp: loginFormData.otp,
      })
    ).then((res) => {
      if (res.payload?.success) {
        toast.success("OTP Verified");
        setOtpVerified(true); // ✅ Now mark OTP as verified
      } else {
        toast.error(res.payload?.message || "Invalid OTP");
      }
    });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <FormControls
        formControls={LoginFormControl}
        formData={loginFormData}
        setFormData={setLoginFormData}
        handleGetOTP={otpSent ? handleVerifyOTP : handleGenerateOTP} // Toggle functions
        isButtonDisabled={isOtpButtonDisabled()}
        otpSent={otpSent}
        otpVerified={otpVerified}
      />
      <p className="text-center text-sm mt-3">
        Don&apos;t have an account?{" "}
        <Link to="/auth/register" className="text-blue-500">
          Register
        </Link>
      </p>
      <Button
        type="submit"
        onClick={onSubmit}
        disabled={!isFormValid() || !otpVerified}
        className={otpVerified && "bg-blue-500"}
      >
        {/* ✅ Disable login until OTP is verified */}
        Login
      </Button>
    </div>
  );
};

export default Login;
