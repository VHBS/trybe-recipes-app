import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function InputsRecipesProgressDrink({ ingredients }) {
  const [checkProgress, setCheckProgress] = useState([]);
  const { id } = useParams();

  const updateLocalStorage = ({ target }) => {
    const recepiesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recepiesInProgress.cocktails[id].includes(target.value)) {
      recepiesInProgress.cocktails[id] = recepiesInProgress.cocktails[id]
        .filter((item) => item !== target.value);
    } else {
      recepiesInProgress
        .cocktails[id] = [...recepiesInProgress.cocktails[id], target.value];
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(recepiesInProgress));
  };

  useEffect(() => {
    const recepiesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log(!recepiesInProgress);
    if (!recepiesInProgress) {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ cocktails: { [id]: [] }, meals: { } }));
      return setCheckProgress([]);
    }
    setCheckProgress(recepiesInProgress.cocktails[id]);
  }, [id, setCheckProgress]);
  return (
    <div>
      { ingredients.map((item, index) => (
        <label
          htmlFor={ `${index} item` }
          data-testid={ `${index}-ingredient-step` }
          key={ item + index }
        >
          {checkProgress.includes(item)
            ? (
              <input
                id={ `${index} item` }
                type="checkbox"
                onClick={ (e) => updateLocalStorage(e) }
                value={ item }
                defaultChecked
              />)
            : (
              <input
                id={ `${index} item` }
                type="checkbox"
                onClick={ (e) => updateLocalStorage(e) }
                value={ item }
              />)}
          {item}
        </label>
      ))}
    </div>
  );
}

InputsRecipesProgressDrink.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string),
}.isRequired;
