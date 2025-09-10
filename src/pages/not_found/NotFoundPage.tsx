import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css";
import PageNotFound from '../../assets/7740133_3737256.svg'

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <div className="notfound-illustration">
            <img src={PageNotFound} alt="" />
        </div>

        <h1>Oops — Page not found</h1>
        <p>
          The page you tried to reach doesn’t exist or has moved.
        </p>

        <div className="notfound-buttons">
          <button onClick={() => navigate("/")} className="btn-primary">
            Take me home
          </button>
          <button onClick={() => window.history.back()} className="btn-secondary">
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
