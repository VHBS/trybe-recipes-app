import React, { useEffect, useState } from 'react';
import CardDoneRecipeDrink from '../components/CardDoneRecipeDrink';
import CardDoneRecipeFood from '../components/CardDoneRecipeFood';
import Header from '../components/Header';

export default function DoneRecipes() {
  const [doneRecipesState, setDoneRecipesState] = useState([]);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipesState(doneRecipes);
  }, [doneRecipesState]);

  return (
    <div>
      <Header title="Done Recipes" />
      <button
        data-testid="filter-by-all-btn"
        type="button"
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
      >
        Drinks
      </button>
      { doneRecipesState.length > 0
        && doneRecipesState.map((item, index) => (
          item.type === 'food'
            ? <CardDoneRecipeFood recipe={ { item, index } } />
            : <CardDoneRecipeDrink recipe={ { item, index } } />
        ))}
    </div>);
}
