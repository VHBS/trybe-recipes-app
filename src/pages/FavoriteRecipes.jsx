import React, { useState, useEffect } from 'react';
import CardDoneRecipeDrink from '../components/CardDoneRecipeDrink';
import CardDoneRecipeFood from '../components/CardDoneRecipeFood';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const [favoriteState, setFavoriteState] = useState([]);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favoriteRecipes) {
      return localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    setFavoriteState(favoriteRecipes);
  }, [setFavoriteState]);

  return (
    <div>
      <Header title="Favorite Recipes" />
      <button
        data-testid="filter-by-all-btn"
        type="button"
        // onClick={ filterByAll }
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        // onClick={ filterByFood }
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        // onClick={ filterByDrink }
      >
        Drinks
      </button>
      { favoriteState.length > 0
        && favoriteState.map((item, index) => (
          item.type === 'food'
            ? (
              <div>
                <CardDoneRecipeFood
                  key={ item.name + index }
                  recipe={ { item, index } }
                />
                <button
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  type="button"
                  src={ blackHeartIcon }
                >
                  <img src={ blackHeartIcon } alt={ item.name } />
                </button>
              </div>)
            : (
              <div>
                <CardDoneRecipeDrink
                  key={ item.name + index }
                  recipe={ { item, index } }
                />
                <button
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  type="button"
                  src={ blackHeartIcon }
                >
                  <img src={ blackHeartIcon } alt={ item.name } />
                </button>
              </div>
            )
        ))}
    </div>);
}
