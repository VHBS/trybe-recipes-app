import React, { useState, useEffect } from 'react';
import CardDoneRecipeDrink from '../components/CardDoneRecipeDrink';
import CardDoneRecipeFood from '../components/CardDoneRecipeFood';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const [favoriteState, setFavoriteState] = useState([]);
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favoriteRecipes) {
      return localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    setFavoriteState(favoriteRecipes);
  }, [setFavoriteState]);

  const desfavoriteClick = (param) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavoritesRecipes = favoriteRecipes.filter((item) => item.id !== param);
    localStorage.setItem('favoriteRecipes', JSON
      .stringify(newFavoritesRecipes));
    setFavoriteState(newFavoritesRecipes);
  };

  return (
    <div>
      {console.log('teste')}
      <Header title="Favorite Recipes" />
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => setFilterType('') }
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ () => setFilterType('food') }
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => setFilterType('drink') }
      >
        Drinks
      </button>
      { favoriteState.length > 0
        && favoriteState.filter((item) => item.type.includes(filterType))
          .map((item, index) => (
            item.type === 'food'
              ? (
                <div
                  key={ item.name + index }
                >
                  <CardDoneRecipeFood
                    recipe={ { item, index } }
                  />
                  <button
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    type="button"
                    src={ blackHeartIcon }
                    onClick={ () => desfavoriteClick(item.id) }
                  >
                    <img src={ blackHeartIcon } alt={ item.name } />
                  </button>
                </div>)
              : (
                <div key={ item.name + index }>
                  <CardDoneRecipeDrink
                    recipe={ { item, index } }
                  />
                  <button
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    type="button"
                    src={ blackHeartIcon }
                    onClick={ () => desfavoriteClick(item.id) }
                  >
                    <img src={ blackHeartIcon } alt={ item.name } />
                  </button>
                </div>
              )
          ))}
    </div>);
}
