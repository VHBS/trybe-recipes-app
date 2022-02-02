import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecepiesContext from '../context/RecepiesContext';
import RenderExploreByIngredient from './RenderExploreByIngredient';

const MAX_QUANTITY = 12;
const PRINCIPAL_FOOD_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const PRINCIPAL_DRINK_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const FIVE_FILTER_FOOD = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const FIVE_FILTER_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const FILTER_SIZE = 5;

const FOODS_BY_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const DRINKS_BY_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

const FOODS_BY_INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const DRINKS_BY_INGREDIENT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

export default function CardRecepies() {
  const {
    resultAPI,
    setResultAPI,
    fiveFilter,
    setFiveFilter,
    fromExploreRecipes,
    setFromExploreRecipes,
  } = useContext(RecepiesContext);

  const history = useHistory();
  const [toggleFilter, setToggleFilter] = useState('');

  // Requisição dos dados.
  const requisitionAPI = (url, setState) => {
    fetch(`${url}`)
      .then((response) => response.json())
      .then((data) => setState(data));
  };

  const { state } = history.location;

  // Ao carregar a página faz a verificação da URL e chama os valores iniciais solicitados
  useEffect(() => {
    // Fetch vindo da página Explore
    const exploreFetch = (url, string) => {
      const cutted = string.substring(1);
      fetch(`${url}${cutted}`)
        .then((res) => res.json())
        .then((data) => setFromExploreRecipes(data));
    };

    if ((state !== undefined) && (state.charAt(0) === 'F')) {
      exploreFetch(FOODS_BY_INGREDIENT, state);
      return exploreFetch(FOODS_BY_INGREDIENT, state);
    }

    if ((state !== undefined) && (state.charAt(0) === 'D')) {
      exploreFetch(DRINKS_BY_INGREDIENT, state);
      return exploreFetch(DRINKS_BY_INGREDIENT, state);
    }

    if (history.location.pathname === '/foods') {
      requisitionAPI(FIVE_FILTER_FOOD, setFiveFilter);
      return requisitionAPI(PRINCIPAL_FOOD_API, setResultAPI);
    }
    requisitionAPI(FIVE_FILTER_DRINK, setFiveFilter);
    return requisitionAPI(PRINCIPAL_DRINK_API, setResultAPI);
  }, [history.location.pathname,
    setFiveFilter, setResultAPI,
    history.location.state,
    history.location,
    setFromExploreRecipes,
    state,
  ]);

  const requisitionByCategory = (url, value) => {
    if (value === toggleFilter) {
      if (history.location.pathname === '/foods') {
        return requisitionAPI(PRINCIPAL_FOOD_API, setResultAPI);
      }
      return requisitionAPI(PRINCIPAL_DRINK_API, setResultAPI);
    }
    setToggleFilter(value);
    fetch(`${url}${value}`)
      .then((response) => response.json())
      .then((data) => setResultAPI(data));
  };

  const fiveFilterMap = (url, array) => array.map((item, index) => (
    <button
      data-testid={ `${item.strCategory}-category-filter` }
      type="button"
      key={ item.strCategory + index }
      value={ item.strCategory }
      onClick={ ({ target: { value } }) => requisitionByCategory(
        url, value,
      ) }
    >
      {item.strCategory}
    </button>
  ));

  return (
    <div>
      {fiveFilter.meals
      && (
        <div>
          {/* Adiciona os buttons para filtrar o Foods */}
          {fiveFilterMap(FOODS_BY_CATEGORY, fiveFilter.meals.slice(0, FILTER_SIZE))}
          <button
            data-testid="All-category-filter"
            type="button"
            onClick={ () => requisitionAPI(PRINCIPAL_FOOD_API, setResultAPI) }
          >
            All
          </button>
        </div>)}
      {/* Renderiza os cards de foods */}
      {(!fromExploreRecipes.meals && resultAPI.meals)
        && resultAPI.meals.slice(0, MAX_QUANTITY)
          .map((item, index) => ((
            <button
              type="button"
              onClick={ () => history.push(`/foods/${item.idMeal}`) }
              data-testid={ `${index}-recipe-card` }
              key={ item.idMeal }
            >
              <h2 data-testid={ `${index}-card-name` }>{ item.strMeal }</h2>
              <img
                width="100vw"
                data-testid={ `${index}-card-img` }
                src={ item.strMealThumb }
                alt={ item.strMeal }
              />
            </button>)
          ))}
      {/* Adiciona os buttons para filtrar o Drinks */}
      {fiveFilter.drinks
      && (
        <div>
          {fiveFilterMap(DRINKS_BY_CATEGORY, fiveFilter.drinks.slice(0, FILTER_SIZE))}
          <button
            data-testid="All-category-filter"
            type="button"
            onClick={ () => requisitionAPI(PRINCIPAL_DRINK_API, setResultAPI) }
          >
            All
          </button>
        </div>
      )}
      {/* Renderiza os cards de drinks */}
      {(!fromExploreRecipes.drinks && resultAPI.drinks)
        && resultAPI.drinks.slice(0, MAX_QUANTITY).map((item, index) => ((
          <button
            type="button"
            data-testid={ `${index}-recipe-card` }
            key={ item.idDrink }
            value={ item.idDrink }
            onClick={ () => history.push(`/drinks/${item.idDrink}`) }
          >
            <h2 data-testid={ `${index}-card-name` }>{ item.strDrink }</h2>
            <img
              width="100vw"
              data-testid={ `${index}-card-img` }
              src={ item.strDrinkThumb }
              alt={ item.strDrink }
            />
          </button>)
        ))}
      <RenderExploreByIngredient />
    </div>
  );
}
