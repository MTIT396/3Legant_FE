import React, { useRef, useState } from "react";
import Button from "../../components/ui/Button/Button";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";
import { showToast } from "../../utils/toast";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
const Register = () => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [inputType, setInputType] = useState("password");
  const handleShowPassword = () => {
    if (isEyeOpen) {
      setInputType("password");
    } else {
      setInputType("text");
    }
    setIsEyeOpen(!isEyeOpen);
  };
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
  });
  // Handle Change
  const handleChange = (e) => {
    // setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle Submit

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/auth/register", form);
      if (res.data.success) {
        showToast(res.data.message, "success");
        navigate("/login");
      } else {
        showToast(res.data.message, "error");
      }
    } catch (err) {
      console.log("Submit form error ", err);
      if (err.response && err.response.data) {
        showToast(err.response.data.message || "Login Failed", "error");
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  const inputId = v4();
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };
  const buttonRef = useRef();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      buttonRef.current.click();
    }
  };

  return (
    <div className="h-[100vh]">
      {/* Content */}
      <div className="h-full flex flex-col lg:flex-row">
        <div className="lg:w-1/2 bg-neutral_2 flex flex-col w-full">
          <h1 className="font-medium text-2xl text-primary mx-auto lg:mt-8 py-4 lg:py-0">
            3legant.
          </h1>
          {/* Image */}
          <div className="lg:h-[460px] max-w-[380px] hidden lg:block m-auto">
            <img
              className="w-full h-full object-contain"
              src="https://cdn.tgdd.vn/Products/Images/42/329135/iphone-16-xanh-mong-ket-thumbnew-600x600.png"
              alt=""
            />
          </div>
        </div>
        <div className="lg:w-1/2 flex items-center justify-center w-full h-full">
          <div className="flex flex-col gap-8 max-w-[456px] px-10 sm:px-0 sm:w-[456px]">
            <div className="flex flex-col">
              <h1 className="text-[40px] leading-[44px] text-neutral_1 mb-6">
                Sign up
              </h1>
              <span className="text-secondary text-sm ">
                Already have an account?
                <button
                  onClick={goToLogin}
                  className="font-medium text-green ml-1 hover:underline"
                >
                  Sign in
                </button>
              </span>
            </div>
            {/* Middle Content */}
            <div className="flex flex-col gap-8">
              <div className="border-b border-grey">
                <input
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="placeholder:text-secondary w-full pb-[14px] outline-none"
                />
              </div>
              <div className="border-b border-grey relative">
                <input
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  type={inputType}
                  name="password"
                  placeholder="Password"
                  className="placeholder:text-secondary w-full pb-[14px] outline-none"
                />
                {form.password && (
                  <button
                    onClick={handleShowPassword}
                    className="absolute top-0 right-0"
                  >
                    {isEyeOpen ? (
                      <IoMdEye size={20} />
                    ) : (
                      <IoMdEyeOff size={20} />
                    )}
                  </button>
                )}
              </div>
              <div className="border-b border-grey">
                <input
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className="placeholder:text-secondary w-full pb-[14px] outline-none"
                />
              </div>

              <div className="">
                <div className="flex items-center ">
                  <div className="price-checkbox -translate-y-1/2">
                    <input
                      type="checkbox"
                      className="w-0 h-0 absolute opacity-0"
                      id={inputId}
                    />
                    <label
                      htmlFor={inputId}
                      className="relative pl-6 w-full block cursor-pointer select-none mb-3"
                    ></label>
                  </div>
                  <p className="ml-3 text-secondary">
                    I agree with
                    <span className="mx-1 text-neutral_1 font-semibold">
                      Privacy Policy
                    </span>
                    and
                    <span className="ml-1 text-neutral_1 font-semibold">
                      Terms of Use
                    </span>
                  </p>
                </div>
              </div>
            </div>
            {/* Button */}
            <span ref={buttonRef} onClick={handleSubmit}>
              <Button className="w-full">Sign up</Button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
