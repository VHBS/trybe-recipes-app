import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import ShareButton from './ShareButton';

export default function CardDoneRecipeFood({ recipe: { item, index } }) {
  return (
    <div>
      <Link
        to={ `/foods/${item.id}` }
        type="button"
      >
        <img
          className="done-recipe-img"
          data-testid={ `${index}-horizontal-image` }
          src={ item.image }
          alt={ item.name }
        />
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          {`${item.nationality} - ${item.category}`}
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
        {item.tags && item.tags.map((tagName) => (
          <p
            key={ tagName }
            data-testid={ `${index}-${tagName}-horizontal-tag` }
          >
            {tagName}
          </p>
        ))}
      </Link>
      <ShareButton index={ index } item={ item } />
    </div>
  );
}

CardDoneRecipeFood.propTypes = {
  recipe: PropTypes.any,
}.isRequired;
