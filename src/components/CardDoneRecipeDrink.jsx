import PropTypes from 'prop-types';
import React from 'react';
import ShareButton from './ShareButton';

export default function CardDoneRecipeDrink({ recipe: { item, index } }) {
  return (
    <div>
      <button
        type="button"
        key={ item.name + index }
      >
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ item.image }
          alt={ item.name }
        />
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          {`${item.category} - ${item.alcoholicOrNot}`}
        </p>
        <p
          data-testid={ `${index}-horizontal-name` }
        >
          {item.name}
        </p>
        <p
          data-testid={ `${index}-horizontal-done-date` }
        >
          {item.doneDate}
        </p>
        <ShareButton done="done" index={ index } />
        {item.tags.map((tagName) => (
          <p
            key={ tagName }
            data-testid={ `${index}-${tagName}-horizontal-tag` }
          >
            {tagName}
          </p>
        ))}
      </button>
    </div>
  );
}

CardDoneRecipeDrink.propTypes = {
  recipe: PropTypes.any,
}.isRequired;
