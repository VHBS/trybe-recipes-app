import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

export default function StartButton({ ingredients }) {
  const [recepieInProgress, setRecepieInProgress] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const recepiesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!recepiesInProgress) {
      const startNewRecepie = { meals: { }, cocktails: {} };
      localStorage.setItem('inProgressRecipes', JSON.stringify(startNewRecepie));
      return setRecepieInProgress(false);
    }
    if (history.location.pathname.includes('foods')
    && recepiesInProgress.meals[id] !== undefined) {
      return setRecepieInProgress(true);
    }
    if (history.location.pathname.includes('drinks')
      || recepiesInProgress.cocktails[id] !== undefined) {
      return setRecepieInProgress(true);
    }
  }, [history.location.pathname, id]);

  const foodRecepieProgress = () => {
    history.push(`/foods/${id}/in-progress`);
    const recepiesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const startNewRecepie = { ...recepiesInProgress,
      meals: { ...recepiesInProgress.meals, [id]: ingredients },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(startNewRecepie));
  };

  const drinkRecepieProgress = () => {
    history.push(`/drinks/${id}/in-progress`);
    const recepiesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const startRecepie = { ...recepiesInProgress,
      cocktails: { ...recepiesInProgress.cocktails, [id]: ingredients } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(startRecepie));
  };

  const handleClick = () => {
    if (history.location.pathname.includes('foods')) {
      return foodRecepieProgress();
    }
    drinkRecepieProgress();
  };

  return (
    <div>
      {recepieInProgress ? (
        <button
          type="button"
          className="init-recepie"
          data-testid="start-recipe-btn"
        >
          Continue Recipe
        </button>)
        : (
          <button
            data-testid="start-recipe-btn"
            type="button"
            className="init-recepie"
            onClick={ handleClick }
          >
            Start Recipe
          </button>)}
    </div>
  );
}

StartButton.propTypes = {
  ingredients: PropTypes.string,
}.isRequired;
