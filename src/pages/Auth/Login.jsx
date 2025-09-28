import React, { useContext, useRef, useState } from "react";
import Button from "../../components/ui/Button/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showToast } from "../../utils/toast";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { axiosClient } from "../../utils/axios";
import { useUser } from "../../contexts/UserContext";
import { ProductContext } from "../../contexts/ProductContext";
import { v4 } from "uuid";
const Login = () => {
  const { fetchUser } = useUser();
  const { fetchProducts } = useContext(ProductContext);

  // Handle show password
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [inputType, setInputType] = useState("password");
  const id_1 = v4();
  const handleShowPassword = () => {
    if (isEyeOpen) {
      setInputType("password");
    } else {
      setInputType("text");
    }
    setIsEyeOpen(!isEyeOpen);
  };
  // Handle button key down
  const buttonRef = useRef();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  // Handle Change
  const handleChange = (e) => {
    // setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // Handle Submit
  const handleSubmit = async () => {
    try {
      const res = await axiosClient.post("/api/auth/login", form);
      if (res.data.success) {
        showToast(res.data.message, "success");
        await fetchUser();
        await fetchProducts();
        window.location.href = "/";
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

  const navigate = useNavigate();
  const goToRegister = () => {
    navigate("/register");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      buttonRef.current.click();
    }
  };
  return (
    <div className="h-screen">
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
                Sign In
              </h1>
              <span className="text-secondary text-sm ">
                Don’t have an account yet?
                <button
                  onClick={goToRegister}
                  className="font-medium text-green ml-1 hover:underline"
                >
                  Sign Up
                </button>
              </span>
            </div>
            {/* Middle Content */}
            <div className="flex flex-col gap-8">
              <div className="border-b border-grey">
                <input
                  type="text"
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  name="username"
                  placeholder="Your username"
                  className="placeholder:text-secondary w-full pb-[14px] outline-none"
                />
              </div>
              <div className="border-b border-grey relative">
                <input
                  type={inputType}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
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
              <div className="">
                <div className="flex flex-wrap gap-x-8 gap-y-4 items-center justify-between">
                  <div className="flex items-center justify-center">
                    <div className="price-checkbox -translate-y-1/2">
                      <input
                        type="checkbox"
                        className="w-0 h-0 absolute opacity-0"
                        id={id_1}
                      />
                      <label
                        htmlFor={id_1}
                        className="relative pl-5 w-full block cursor-pointer select-none mb-3"
                      ></label>
                    </div>
                    <span className="ml-3 text-secondary">Remember me</span>
                  </div>

                  <button className="text-neutral_1 font-semibold hover:underline">
                    Forgot password?
                  </button>
                </div>
              </div>
            </div>
            {/* Button */}
            <span ref={buttonRef} onClick={handleSubmit}>
              <Button className="w-full">Sign In</Button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
