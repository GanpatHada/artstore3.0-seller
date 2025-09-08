import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import "./Login.css";
import { fetchSellerLogin } from "../../services/authService";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import GuestLoginButton from "../../components/GuestLoginButton";
import ArtstoreSellerLogo from '../../assets/Artstoreseller.svg'

type LoginInputs = {
  emailOrPhone: string;
  password: string;
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setLoading(true);
    try {
      const result = await fetchSellerLogin(data.emailOrPhone, data.password);
      console.log("Login response:", result);
      toast.success("Login successful!");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="login-page">
      <header>
        <img src={ArtstoreSellerLogo} alt="" />
      </header>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Sign in</h2>

          {/* Email or Phone */}
          <div>
            <label htmlFor="emailOrPhone">Email or phone number</label>
            <input
              id="emailOrPhone"
              type="text"
              autoComplete="username" // tells browser this is the username/email
              {...register("emailOrPhone", {
                required: "Email or phone is required",
                validate: (value) => {
                  const emailRegex =
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                  const phoneRegex = /^\d{10}$/;
                  if (emailRegex.test(value) || phoneRegex.test(value)) return true;
                  return "Enter a valid email or 10-digit phone number";
                },
              })}
            />
            {errors.emailOrPhone && (
              <p className="error">{errors.emailOrPhone.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password" // tells browser this is the password for the username
              {...register("password", {
                required: "Password is required",
                validate: (value) =>
                  value.length >= 6 || "Password must be at least 6 characters",
              })}
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>

          {/* Sign In Button */}
          <div>
            <button
              id="login-button"
              className="primary-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <p>
            By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
          </p>

          <div>
            <p>Do not have an account ?</p>
            <Link to={"/signup"}>
              Register
            </Link>
          </div>



          <GuestLoginButton />
        </form>
        
      </main>  
    </div>
  );
};

export default Login;
