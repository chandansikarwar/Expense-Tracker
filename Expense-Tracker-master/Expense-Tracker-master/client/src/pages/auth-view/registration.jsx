import { useState } from "react";
import {
  registerFormControls,
  registerFormInitial,
} from "../../config/formFields";
import FormControls from "../../components/common/common-Form/FormControl";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/auth/authSlice";
import { toast } from "react-hot-toast";

const Registration = () => {
  const [registrationFormData, setRegistrationFormData] =
    useState(registerFormInitial);
  const dispatch = useDispatch();

  // Function to check if all required fields are filled
  const isFormValid = Object.values(registrationFormData).every(
    (field) => field.trim() !== "" // Checks if the field is not empty
  );

  function onSubmit(event) {
    event.preventDefault();

    dispatch(registerUser(registrationFormData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
      } else {
        toast.error(data?.payload?.message);
      }
    });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4 ">
        Register
      </h2>
      <FormControls
        formControls={registerFormControls}
        formData={registrationFormData}
        setFormData={setRegistrationFormData}
      />
      <p className="text-center text-sm mt-3">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-blue-500">
          Sign in
        </Link>
      </p>
      <Button
        type="submit"
        onClick={onSubmit}
        className={`cursor-pointer px-4 py-2 bg-[#272A34] text-white rounded ${
          isFormValid && "bg-blue-700"
        }`}
        disabled={!isFormValid} // Disable button if form is not valid
      >
        Sign Up
      </Button>
    </div>
  );
};

export default Registration;
