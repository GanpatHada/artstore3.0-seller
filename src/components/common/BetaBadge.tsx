import React, { type JSX } from 'react';

const BetaBadge: React.FC = (): JSX.Element => (
  <span
    style={{
      backgroundColor: '#b8f7d4',
      color: '#28a745',
      padding: '2px 6px',
      borderRadius: '4px',
      fontSize: '0.7rem',
      fontWeight: 'bold',
      marginLeft: '8px',
      verticalAlign: 'middle',
    }}
  >
    BETA
  </span>
);

export default BetaBadge;
