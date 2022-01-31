import React from 'react';
import { useHistory } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';

export default function ExplorerDrink() {
  const history = useHistory();

  const redirectToExpDrink = () => {
    history.push('/explore/drinks/ingredients');
  };

  const redirectToDrinkDetails = () => {
    history.push('/drinks/:id');
  };
  return (
    <div>
      <Header title="Explore Drinks" />
      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ redirectToExpDrink }
      >
        By Ingredient
      </button>
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ redirectToDrinkDetails }
      >
        Surprise me!
      </button>
      <FooterMenu />
    </div>);
}
