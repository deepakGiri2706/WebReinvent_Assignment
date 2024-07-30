import { useEffect, useState } from "react";
import { createUser } from "../services/auth_service";
import { validateEmail } from "../utils/validation";
import { useDispatch } from "react-redux";
import { login } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { catchErr } from "../utils/common_function";
import InputField from "./InputField";

export const SignUpForm: React.FC = () => {
  const [S_disabled, setDisabled] = useState(true);
  const [S_formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [S_confrmPass, setConfrmPass] = useState("");
  const dispatch = useDispatch();
  const [S_errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const nameValidation = S_formData?.name.length >= 2 ? true : false;
    const emailValidation = validateEmail(S_formData?.email);
    const passwordValidation =
      S_formData?.password &&
      S_formData?.password.length >= 8 &&
      S_formData?.password == S_confrmPass
        ? true
        : false;
    if (nameValidation && emailValidation && passwordValidation) {
      setDisabled(false);
    } else if (S_disabled == false) {
      setDisabled(true);
    }
  }, [S_formData, S_confrmPass]);
  const handleSubmit = async () => {
    try {
      const response = await createUser(S_formData);
      if (response?.token) {
        dispatch(login(response.token));
        navigate("/dashboard");
      } else {
        setErrorMsg("Unable To Login");
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

  return (
    <>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Sign up</h1>

              <InputField
                handleInputChange={handleInputChange}
                label="Full Name"
                id="name"
                placeholder="Enter Your Full Name"
                type="text"
              />
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

              <InputField
                handleInputChange={(key, value)=>setConfrmPass(value)}
                label="Confirm Password"
                id="confirm_password"
                placeholder="Enter Your Password Again"
                type="password"
              />

              

              {S_errorMsg && (
                <span className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                  {S_errorMsg}
                </span>
              )}
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
                Create Account
              </button>

              <div className="text-center text-sm text-grey-dark mt-4">
                By signing up, you agree to the
                <a
                  className="no-underline border-b border-grey-dark text-grey-dark"
                  href="#"
                >
                  Terms of Service
                </a>{" "}
                and
                <a
                  className="no-underline border-b border-grey-dark text-grey-dark"
                  href="#"
                >
                  Privacy Policy
                </a>
              </div>
            </div>

            <div className="text-grey-dark mt-6">
              Already have an account?
              <a
                className="no-underline border-b border-blue text-blue"
                href="/signin"
              >
                Log in
              </a>
              .
            </div>
          </div>
        
      </div>
    </>
  );
};
