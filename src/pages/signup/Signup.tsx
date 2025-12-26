import React, { useState, type JSX } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { fetchSellerRegistration } from '../../services/authService';
import GuestLoginButton from '../../components/GuestLoginButton';
import ArtstoreSellerLogo from '../../assets/Artstoreseller.svg';
import toast from 'react-hot-toast';

type SignupInputs = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const Signup: React.FC = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupInputs>();

  const password = watch('password');

  const onSubmit: SubmitHandler<SignupInputs> = async (data) => {
    setLoading(true);
    try {
      const result = await fetchSellerRegistration(
        data.fullName,
        data.email,
        data.phone,
        data.password
      );
      navigate('/login', { state: { email: result.email } });
      toast.success('Registration successfull');
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong while registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="signup-page">
      <header>
        <img src={ArtstoreSellerLogo} alt="" />
      </header>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Create Account</h2>

          {/* Full Name */}
          <div>
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              {...register('fullName', {
                required: 'Full Name is required',
                minLength: {
                  value: 2,
                  message: 'Full Name must be at least 2 characters',
                },
              })}
            />
            {errors.fullName && (
              <p className="error">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Enter a valid email',
                },
              })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="text"
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^\d{10}$/,
                  message: 'Enter a valid 10-digit phone number',
                },
              })}
            />
            {errors.phone && <p className="error">{errors.phone.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              {...register('password', {
                required: 'Password is required',
                validate: (value) =>
                  value.length >= 6 || 'Password must be at least 6 characters',
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
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              {...register('confirmPassword', {
                required: 'Confirm your password',
                validate: (value) =>
                  value === password || 'Passwords do not match',
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
            <button
              id="signup-button"
              className="primary-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>

          <hr />
          <div>
            <h5>Already a seller?</h5>
            <Link to={'/login'}>
              <button className="primary-link-btn">Sign in instead</button>
            </Link>
          </div>
          <hr />
          <div>
            <p>
              By continuing, you agree to Artstore's{' '}
              <a className="primary-link-btn" href="/">
                Conditions of Use
              </a>{' '}
              and{' '}
              <a className="primary-link-btn" href="/">
                Privacy Policy
              </a>
            </p>
          </div>
          <GuestLoginButton />
        </form>
      </main>
    </div>
  );
};

export default Signup;
