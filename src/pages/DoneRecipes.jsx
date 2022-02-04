import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';

export default function DoneRecipes() {
  const [doneRecipesState, setDoneRecipesState] = useState([]);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipesState(doneRecipes);
  }, [doneRecipesState]);

  return (
    <div>
      <Header title="Done Recipes" />
      <button
        data-testid="filter-by-all-btn"
        type="button"
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
      >
        Drinks
      </button>
      { doneRecipesState.length > 0
        && doneRecipesState.map((item, index) => (
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
              {item.category}
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
        ))}
    </div>);
}
