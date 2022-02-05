import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function ShareButton({ index, item }) {
  const [showCopy, setShowCopy] = useState(false);
  const location = useLocation();

  const checkLocation = () => {
    if (location.pathname.includes('/done-recipes')) {
      if (item.type === 'drink') {
        copy(`http://localhost:3000/drinks/${item.id}`);
      } else {
        copy(`http://localhost:3000/foods/${item.id}`);
      }
    } else {
      const link = location.pathname.replace('/in-progress', '');
      copy(`http://localhost:3000${link}`);
    }
    setShowCopy(true);
  };

  return (
    <div>
      {!location.pathname.includes('/done-recipes') ? (
        <button
          data-testid="share-btn"
          type="button"
          onClick={ checkLocation }
          src={ shareIcon }
        >
          <img src={ shareIcon } alt="share button" />
        </button>)
        : (
          <button
            data-testid={ `${index}-horizontal-share-btn` }
            type="button"
            onClick={ checkLocation }
            src={ shareIcon }
          >
            <img src={ shareIcon } alt="share button" />
          </button>
        )}

      {showCopy && (
        <p>Link copied!</p>
      )}
    </div>
  );
}

ShareButton.propTypes = {
  index: PropTypes.number.isNotRequired,
  item: PropTypes.any,
}.isRequired;
