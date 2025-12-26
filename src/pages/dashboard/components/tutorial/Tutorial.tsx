import React from 'react';
import './Tutorial.css';
import { Link } from 'react-router-dom';

const Tutorial: React.FC = () => {
  return (
    <div id="tutorial-box">
      <header>
        <h3>Tutorial</h3>
      </header>
      <main>
        <iframe src="https://www.youtube.com/embed/75V1bTrsXnw"></iframe>
        <Link to={'/help'}>see FAQS</Link>
      </main>
    </div>
  );
};

export default Tutorial;
