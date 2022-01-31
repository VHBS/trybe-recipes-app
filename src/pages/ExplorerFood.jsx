import React from 'react';
import { useHistory } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';

export default function ExplorerFood() {
  const history = useHistory();

  const redirectToExpIngr = () => {
    history.push('/explore/foods/ingredients');
  };

  const redirectToExpLocal = () => {
    history.push('/explore/foods/nationalities');
  };

  const redirectToFoodDetails = () => {
    history.push('/foods/:id');
  };

  return (
    <div>
      <Header title="Explore Foods" />
      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ redirectToExpIngr }
      >
        By Ingredient
      </button>
      <button
        data-testid="explore-by-nationality"
        type="button"
        onClick={ redirectToExpLocal }
      >
        By Nationality
      </button>
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ redirectToFoodDetails }
      >
        Surprise me!
      </button>
      <FooterMenu />
    </div>
  );
}
