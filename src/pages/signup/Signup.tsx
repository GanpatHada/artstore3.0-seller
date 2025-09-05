import React, { useState, type JSX } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import "./Signup.css";

type SignupInputs = {
  name: string;
  emailOrPhone: string;
  password: string;
  confirmPassword: string;
};

const Signup: React.FC = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupInputs>();

  const onSubmit: SubmitHandler<SignupInputs> = (data) => {
    console.log("Signup Data:", data);
    // API call here
  };

  // For confirming password
  const password = watch("password");

  return (
    <div id="signup-page">
      <header>
        <h4>artstore seller</h4>

        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Create Account</h2>

          {/* Name */}
          <div>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>

          {/* Email or Phone */}
          <div>
            <label htmlFor="emailOrPhone">Email or phone number</label>
            <input
              id="emailOrPhone"
              type="text"
              {...register("emailOrPhone", {
                required: "Email or phone is required",
                validate: (value) => {
                  const emailRegex =
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                  const phoneRegex = /^\d{10}$/;

                  if (emailRegex.test(value) || phoneRegex.test(value)) {
                    return true;
                  }
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
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                validate: (value) =>
                  value.length >= 6 || "Password must be at least 6 characters",
              })}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Show Password Checkbox */}
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show password
            </label>
          </div>

          {/* Signup Button */}
          <div>
            <button id="signup-button" className="primary-btn" type="submit">
              Create account
            </button>
          </div>
          <hr />
         <div>
             <h5>Already a seller ?</h5>
             <button className="primary-link-btn">Sign in instead</button>
         </div>
         <hr />
         <div>
             <p>
            By continuing, you agree to Artstore's <a className="primary-link-btn" href="/">Conditions of Use</a> and <a className="primary-link-btn" href="/">Privacy Policy</a>
          </p>
         </div>
        </form>
      </header>
    </div>
  );
};

export default Signup;
