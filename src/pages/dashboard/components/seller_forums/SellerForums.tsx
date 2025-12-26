import React from 'react';
import './SellerForums.css';
import sellerForums from '../../../../data/sellerForums.json';
import BetaBadge from '../../../../components/common/BetaBadge';

const SellerForums: React.FC = () => {
  return (
    <div id="forums-box">
      <header>
        <h3>Seller Forums</h3>
        <BetaBadge />
      </header>
      <main>
        {sellerForums.questions.map((ques, i) => {
          return (
            <div key={i}>
              <span>{ques.date}</span>
              <h4>{ques.question}</h4>
              <a href="/">read more</a>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default SellerForums;
