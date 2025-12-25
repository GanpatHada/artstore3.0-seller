import React, { useEffect } from "react";
import { useSeller } from "../contexts/SellerContext";
import { useNavigate } from "react-router-dom";
import Spinner from '../assets/spinner.svg';
import logo from '../assets/a.svg';

const Initializer = () => {
  return (
    <div className="initializer">
      <img id="logo" src={logo} alt="a" />
      <img id='spinner' src={Spinner} alt="..." />
      <p>
        🚀 Please wait ...<br /> Hosted on Render, so it may take a few seconds to wake up.
      </p>
    </div>
  );
};

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { seller, loading, initialized } = useSeller();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect only after initialization and loading is finished
    if (initialized && !loading && !seller) {
      navigate("/login", { replace: true });
    }
  }, [initialized, loading, seller, navigate]);

  // Show loader until initialization finishes
  if (!initialized || loading) {
    return <Initializer />;
  }

  // Once initialized, if seller is null, the useEffect will redirect
  if (!seller) {
    return null; // don't render anything until redirect happens
  }

  return <>{children}</>;
};

export default ProtectedRoute;
