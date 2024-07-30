import { useEffect, useState } from "react";
import { loginUser } from "../services/auth_service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/slice/authSlice";
import { validateEmail } from "../utils/validation";
import { catchErr } from "../utils/common_function";
import InputField from "./InputField";

export default function SignInForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [S_formData, setFormData] = useState({ email: "", password: "" });
  const [S_errorMsg, setErrorMsg] = useState("");
  const [S_disabled, setDisabled] = useState(true);
  const handleSubmit = async () => {
    try {
      const response = await loginUser(S_formData);
      if (response?.token) {
        dispatch(login(response.token));
        navigate("/dashboard");
      } else {
        setErrorMsg("Invalid Password or Email");
      }
    } catch (err) {
      catchErr(err);
    }
  };
  const handleInputChange = (key: string, value: string) => {
    try {
      
      const formData = { ...S_formData, [key]: value };
      setFormData(formData);
    } catch (err) {
      catchErr(err);
    }
  };
  useEffect(() => {
    
    const emailValidation = validateEmail(S_formData?.email);
    const passwordValidation =
      S_formData?.password && S_formData?.password.length >= 8 ? true : false;
    if (emailValidation && passwordValidation) {
      setDisabled(false);
    } else if (S_disabled === false) {
      setDisabled(true);
    }
  }, [S_formData]);
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-xs p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-6 text-2xl font-bold text-center">Welcome</h2>
          
            <InputField
              handleInputChange={handleInputChange}
              label="Email"
              id="email"
              placeholder="Enter Your Email"
              type="email"
            />
            <InputField
              handleInputChange={handleInputChange}
              label="Password"
              id="password"
              placeholder="Enter Your Password"
              type="password"
            />
            <span className="text-xs text-gray-400  mb-4">Minimumn Allow Character is 8</span>
            {S_errorMsg &&  <span className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">{S_errorMsg}</span>}
            <button
              onClick={handleSubmit}
              disabled={S_disabled}
              type="submit"
              className={`w-full px-3 py-2 font-semibold text-white rounded-lg ${
                S_disabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              }`}
            >
              Log in
            </button>
          
          <p className="mt-4 text-center text-sm">
            New user?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    
    </>
  );
}
