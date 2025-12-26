import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import './Login.css';
import {
  fetchSellerLogin,
  type LoginResponse,
  type Seller,
} from '../../services/authService';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GuestLoginButton from '../../components/GuestLoginButton';
import ArtstoreSellerLogo from '../../assets/Artstoreseller.svg';
import { useSeller } from '../../contexts/SellerContext';

type LoginInputs = {
  emailOrPhone: string;
  password: string;
};

const Login: React.FC = () => {
  const { login } = useSeller();
  const location = useLocation();
  const navigate = useNavigate();
  const emailFromNav = location.state?.email ?? '';
  const { seller, loading: sloading } = useSeller();

  console.log(seller, sloading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    defaultValues: {
      emailOrPhone: emailFromNav,
      password: '',
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setLoading(true);
    try {
      const result: LoginResponse = await fetchSellerLogin(
        data.emailOrPhone,
        data.password
      );
      console.log('Login response:', result);
      toast.success('Login successful!');

      const seller: Seller = {
        ...result.seller,
        accessToken: result.accessToken,
      };
      login(seller);
      navigate('/');
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="login-page">
      <header>
        <img src={ArtstoreSellerLogo} alt="Artstore Seller Logo" />
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
              autoComplete="username"
              {...register('emailOrPhone', {
                required: 'Email or phone is required',
                validate: (value) => {
                  const emailRegex =
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                  const phoneRegex = /^\d{10}$/;
                  if (emailRegex.test(value) || phoneRegex.test(value))
                    return true;
                  return 'Enter a valid email or 10-digit phone number';
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
              autoComplete="current-password"
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

          {/* Sign In Button */}
          <div>
            <button
              id="login-button"
              className="primary-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <p>
            By continuing, you agree to Amazon's Conditions of Use and Privacy
            Notice.
          </p>

          <div>
            <p>Do not have an account?</p>
            <Link to={'/signup'}>Register</Link>
          </div>

          <GuestLoginButton />
        </form>
      </main>
    </div>
  );
};

export default Login;
