import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecepiesContext from '../context/RecepiesContext';

const MAGIC_NUMBER = 12;

export default function RenderExploreByIngredient() {
  const { fromExploreRecipes } = useContext(RecepiesContext);
  const history = useHistory();

  return (
    <div>
      { fromExploreRecipes && fromExploreRecipes.meals
        ? fromExploreRecipes.meals.slice(0, MAGIC_NUMBER).map((e, i) => (
          <button
            type="button"
            onClick={ () => history.push(`/foods/${e.idMeal}`) }
            data-testid={ `${i}-recipe-card` }
            key={ e.idMeal }
          >
            <h2 data-testid={ `${i}-card-name` }>{ e.strMeal }</h2>
            <img
              width="100vw"
              data-testid={ `${i}-card-img` }
              src={ e.strMealThumb }
              alt={ e.strMeal }
            />
          </button>
        )) : null }
      { fromExploreRecipes && fromExploreRecipes.drinks
        ? fromExploreRecipes.drinks.slice(0, MAGIC_NUMBER).map((e, i) => (
          <button
            type="button"
            data-testid={ `${i}-recipe-card` }
            key={ e.idDrink }
            value={ e.idDrink }
            onClick={ () => history.push(`/drinks/${e.idDrink}`) }
          >
            <h2 data-testid={ `${i}-card-name` }>{ e.strDrink }</h2>
            <img
              width="100vw"
              data-testid={ `${i}-card-img` }
              src={ e.strDrinkThumb }
              alt={ e.strDrink }
            />
          </button>
        )) : null }
    </div>
  );
}
