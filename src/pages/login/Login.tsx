import React, { type JSX } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import "./Login.css";

type LoginInputs = {
  emailOrPhone: string;
  password: string;
};

const Login: React.FC = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    console.log("Form Data:", data);
    // API call here
  };

  return (
    <div id="login-page">
      <header>
        <h4>artstore seller</h4>

        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Sign in</h2>

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
              type="password"
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

          {/* Sign In Button */}
          <div>
            <button id="login-button" className="primary-btn" type="submit">
              Sign in
            </button>
          </div>

          <p>
            By continuing, you agree to Amazon's Conditions of Use and Privacy
            Notice.
          </p>

          {/* Register Button */}
          <div>
            <button type="button">Register</button>
          </div>
        </form>
      </header>
    </div>
  );
};

export default Login;
