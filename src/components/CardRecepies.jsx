import React, { useContext } from 'react';
import RecepiesContext from '../context/RecepiesContext';

const MAX_QUANTITY = 12;

export default function CardRecepies() {
  const { resultAPI } = useContext(RecepiesContext);

  return (
    <div>
      {resultAPI.meals && resultAPI.meals.slice(0, MAX_QUANTITY).map((item, index) => ((
        <div data-testid={ `${index}-recipe-card` } key={ item.idMeal }>
          <p>{item.idMeal}</p>
          <h2 data-testid={ `${index}-card-name` }>{ item.strMeal }</h2>
          <img
            data-testid={ `${index}-card-img` }
            src={ item.strMealThumb }
            alt={ item.strMeal }
          />
        </div>)
      ))}
      {resultAPI.drinks && resultAPI.drinks.slice(0, MAX_QUANTITY).map((item, index) => ((
        <div data-testid={ `${index}-recipe-card` } key={ item.idDrink }>
          <p>{item.idDrink}</p>
          <h2 data-testid={ `${index}-card-name` }>{ item.strDrink }</h2>
          <img
            data-testid={ `${index}-card-img` }
            src={ item.strDrinkThumb }
            alt={ item.strDrink }
          />
        </div>)
      ))}
    </div>
  );
}
