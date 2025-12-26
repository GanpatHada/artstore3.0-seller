import React from 'react';
import './Help.css';
import faqs from '../../data/faqs.json';

const Help: React.FC = () => {
  return (
    <div id="help-page">
      <header>
        <h2>Frequently Asked Questions</h2>
      </header>
      <main>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3 className="faq-question">{faq.question}</h3>
              <p className="faq-answer">{faq.answer}</p>
            </div>
          ))}
        </div>
      </main>
      <footer>
        <div className="contact-support">
          <h2>Contact Support</h2>
          <p>
            If you can't find the answer you're looking for, please don't
            hesitate to reach out to our support team.
          </p>
          <p>
            Email:{' '}
            <a href="mailto:hadaganpat42@gmail.com">hadaganpat42@gmail.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Help;
