import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function ShareButton() {
  const [showCopy, setShowCopy] = useState(false);
  const location = useLocation();

  const handleClick = () => {
    copy(`http://localhost:3000${location.pathname}`);
    setShowCopy(true);
  };

  return (
    <div>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ handleClick }
      >
        <img src={ shareIcon } alt="share button" />
      </button>
      {showCopy && (
        <p>Link copied!</p>
      )}
    </div>
  );
}
