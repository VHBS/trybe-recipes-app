import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecepiesContext from '../context/RecepiesContext';

const MAX_QUANTITY = 12;
const PRINCIPAL_FOOD_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const PRINCIPAL_DRINK_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const FIVE_FILTER_FOOD = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const FIVE_FILTER_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const FILTER_SIZE = 5;

const FOODS_BY_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const DRINKS_BY_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

export default function CardRecepies() {
  const { resultAPI,
    setResultAPI, fiveFilter, setFiveFilter } = useContext(RecepiesContext);
  const history = useHistory();

  useEffect(() => {
    const requisitionAPI = (url, setState) => {
      fetch(`${url}`)
        .then((response) => response.json())
        .then((data) => setState(data));
    };
    if (history.location.pathname === '/foods') {
      requisitionAPI(FIVE_FILTER_FOOD, setFiveFilter);
      return requisitionAPI(PRINCIPAL_FOOD_API, setResultAPI);
    }
    requisitionAPI(FIVE_FILTER_DRINK, setFiveFilter);
    return requisitionAPI(PRINCIPAL_DRINK_API, setResultAPI);
  }, [history.location.pathname, setFiveFilter, setResultAPI]);

  const requisitionByCategory = async (value, type) => {
    if (type === 'meals') {
      return fetch(`${FOODS_BY_CATEGORY}${value}`)
        .then((response) => response.json())
        .then((data) => setResultAPI(data));
    }
    return fetch(`${DRINKS_BY_CATEGORY}${value}`)
      .then((response) => response.json())
      .then((data) => setResultAPI(data));
  };

  const fiveFilterMap = (array, type) => array.map((item, index) => (
    <button
      data-testid={ `${item.strCategory}-category-filter` }
      type="button"
      key={ item.strCategory + index }
      value={ item.strCategory }
      onClick={ ({ target: { value } }) => requisitionByCategory(
        value, type,
      ) }
    >
      {item.strCategory}
    </button>
  ));

  return (
    <div>
      {fiveFilter.meals && fiveFilterMap(fiveFilter.meals.slice(0, FILTER_SIZE), 'meals')}

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

      {fiveFilter.drinks && fiveFilterMap(
        fiveFilter.drinks.slice(0, FILTER_SIZE), 'drinks',
      )}

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
