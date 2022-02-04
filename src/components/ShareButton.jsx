import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function ShareButton({ done, index, item }) {
  const [showCopy, setShowCopy] = useState(false);
  const location = useLocation();

  const handleClickShare = () => {
    const link = location.pathname.replace('/in-progress', '');
    copy(`http://localhost:3000${link}`);
    setShowCopy(true);
  };

  const handleClickDone = () => {
    if (item.type === 'drink') {
      copy(`http://localhost:3000/drinks/${item.id}`);
    } else {
      copy(`http://localhost:3000/foods/${item.id}`);
    }
    setShowCopy(true);
  };

  return (
    <div>
      {!done === 'done' ? (
        <button
          data-testid="share-btn"
          type="button"
          onClick={ handleClickShare }
          src={ shareIcon }
        >
          <img src={ shareIcon } alt="share button" />
        </button>)
        : (
          <button
            data-testid={ `${index}-horizontal-share-btn` }
            type="button"
            onClick={ handleClickDone }
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
  done: PropTypes.string,
  index: PropTypes.number.isNotRequired,
  item: PropTypes.any,
}.isRequired;
