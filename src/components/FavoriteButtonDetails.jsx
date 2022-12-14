import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecepiesContext from '../context/RecepiesContext';

export default function FavoriteButtonDetails() {
  const [favorited, setFavorited] = useState(false);
  const { detailProduct } = useContext(RecepiesContext);
  const location = useLocation();
  const mealsOrDrinks = location.pathname.includes('foods') ? 'meals' : 'drinks';

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favoriteRecipes) {
      return localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    let checkfavs = [];
    if (location.pathname.includes('foods')) {
      checkfavs = favoriteRecipes
        .some((item) => item.id === detailProduct[mealsOrDrinks][0].idMeal);
    }
    if (location.pathname.includes('drinks')) {
      checkfavs = favoriteRecipes
        .some((item) => item.id === detailProduct[mealsOrDrinks][0].idDrink);
    }
    setFavorited(checkfavs);
  }, [detailProduct, location.pathname, mealsOrDrinks, setFavorited]);

  const favoritedFood = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const recepieFavorited = {
      id: detailProduct[mealsOrDrinks][0].idMeal,
      type: 'food',
      nationality: detailProduct[mealsOrDrinks][0].strArea,
      category: detailProduct[mealsOrDrinks][0].strCategory,
      alcoholicOrNot: '',
      name: detailProduct[mealsOrDrinks][0].strMeal,
      image: detailProduct[mealsOrDrinks][0].strMealThumb,
    };
    localStorage.setItem('favoriteRecipes', JSON
      .stringify([...favoriteRecipes, recepieFavorited]));
    setFavorited(true);
  };

  const favoritedDrink = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const recepieFavorited = {
      id: detailProduct[mealsOrDrinks][0].idDrink,
      type: 'drink',
      nationality: '',
      category: detailProduct[mealsOrDrinks][0].strCategory,
      alcoholicOrNot: detailProduct[mealsOrDrinks][0].strAlcoholic,
      name: detailProduct[mealsOrDrinks][0].strDrink,
      image: detailProduct[mealsOrDrinks][0].strDrinkThumb,
    };
    localStorage.setItem('favoriteRecipes', JSON
      .stringify([...favoriteRecipes, recepieFavorited]));
    setFavorited(true);
  };

  const handleClickFavorite = () => {
    setFavorited(true);
    if (location.pathname.includes('foods')) {
      return favoritedFood();
    }
    favoritedDrink();
  };

  const handleClickDesfavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const idProduct = location.pathname.includes('foods') ? 'idMeal' : 'idDrink';
    const newFavs = favoriteRecipes.filter((item) => item.id
    !== detailProduct[mealsOrDrinks][0][idProduct]);
    localStorage.setItem('favoriteRecipes', JSON
      .stringify(newFavs));
    setFavorited(false);
  };

  return (
    <div>
      {!favorited ? (
        <button
          data-testid="favorite-btn"
          type="button"
          src={ whiteHeartIcon }
          onClick={ handleClickFavorite }
        >
          <img src={ whiteHeartIcon } alt="bot??o de favorito" />
        </button>
      ) : (
        <button
          data-testid="favorite-btn"
          type="button"
          src={ blackHeartIcon }
          onClick={ handleClickDesfavorite }
        >
          <img src={ blackHeartIcon } alt="favoritado" />
        </button>
      )}
    </div>

  );
}
