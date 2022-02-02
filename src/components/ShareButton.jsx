import React from 'react';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton() {
  return (
    <button data-testid="share-btn" type="button">
      <img src={ shareIcon } alt="share button" />
    </button>
  );
}
