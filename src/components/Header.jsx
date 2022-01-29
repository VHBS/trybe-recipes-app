import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecepiesContext from '../context/RecepiesContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const FOOD_INGREDIENT_API = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const FOOD_NAME_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const FOOD_FIRST_LETTER_API = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

const DRINK_INGREDIENT_API = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const DRINK_NAME_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const DRINK_FIRST_LETTER_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

export default function Header(props) {
  const { setResultAPI } = useContext(RecepiesContext);
  const [showInput, setShowInput] = useState(false);
  const [inputRadioVal, setInputRadio] = useState('');
  const [inputTextVal, setInputText] = useState('');

  const { title, search } = props;
  const history = useHistory();

  const handleClick = () => {
    history.push('/profile');
  };

  const requisitionAPI = (url) => {
    fetch(`${url}${inputTextVal}`)
      .then((response) => response.json())
      .then((data) => {
        if (history.location.pathname === '/foods') {
          if (data.meals === null) {
            return global
              .alert('Sorry, we haven\'t found any recipes for these filters.');
          } if (data.meals.length === 1) {
            return history.push(`/foods/${data.meals[0].idMeal}`);
          }
          return setResultAPI(data);
        }
        if (data.drinks === null) {
          return global
            .alert('Sorry, we haven\'t found any recipes for these filters.');
        }
        if (data.drinks.length === 1) {
          return history.push(`/drinks/${data.drinks[0].idDrink}`);
        }
        return setResultAPI(data);
      });
  };

  const searchFoods = () => {
    if (inputRadioVal === 'ingredient') {
      requisitionAPI(FOOD_INGREDIENT_API);
    }
    if (inputRadioVal === 'name') {
      requisitionAPI(FOOD_NAME_API);
    }
    if (inputRadioVal === 'first-letter') {
      if (inputTextVal.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      requisitionAPI(FOOD_FIRST_LETTER_API);
    }
  };

  const searchDrinks = () => {
    if (inputRadioVal === 'ingredient') {
      requisitionAPI(DRINK_INGREDIENT_API);
    }
    if (inputRadioVal === 'name') {
      requisitionAPI(DRINK_NAME_API);
    }
    if (inputRadioVal === 'first-letter') {
      if (inputTextVal.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      requisitionAPI(DRINK_FIRST_LETTER_API);
    }
  };

  const handleSearch = () => {
    if (history.location.pathname === '/foods') {
      // console.log(resultAPI);
      // if (resultAPI.meals === null) {
      //   global.alert('Sorry, we haven\'t found any recipes for these filters.');
      // return console.log(!!resultAPI.meals, resultAPI.meals.length);
      // }
      return searchFoods();
    }
    return searchDrinks();
  };

  return (
    <header>
      <h3 data-testid="page-title">{title}</h3>
      <button
        type="button"
        data-testid="profile-top-btn"
        src={ profileIcon }
        onClick={ handleClick }
      >
        <img src={ profileIcon } alt="icone para perfil" />
      </button>
      {search && (
        <div>
          <button
            type="button"
            data-testid="search-top-btn"
            src={ searchIcon }
            onClick={ () => setShowInput(!showInput) }
          >
            <img src={ searchIcon } alt="icone para pesquisar" />
          </button>
          { showInput && (
            <input
              onChange={ ({ target: { value } }) => setInputText(value) }
              defaultValue={ inputTextVal }
              data-testid="search-input"
              type="text"
            />
          )}
          <div>
            <label htmlFor="search-ingredient">
              <input
                data-testid="ingredient-search-radio"
                type="radio"
                name="search"
                id="search-ingredient"
                value="ingredient"
                onClick={ ({ target: { value } }) => setInputRadio(value) }
              />
              Ingredient
            </label>
            <label htmlFor="search-name">
              <input
                id="search-name"
                data-testid="name-search-radio"
                type="radio"
                name="search"
                value="name"
                onClick={ ({ target: { value } }) => setInputRadio(value) }
              />
              Name
            </label>
            <label htmlFor="search-first-letter">
              <input
                id="search-first-letter"
                data-testid="first-letter-search-radio"
                type="radio"
                name="search"
                value="first-letter"
                onClick={ ({ target: { value } }) => setInputRadio(value) }
              />
              First letter
            </label>
            <button
              data-testid="exec-search-btn"
              type="button"
              onClick={ handleSearch }
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;
