import React from 'react';
import { useHistory } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';

export default function ExplorerPage() {
  const history = useHistory();

  const redirectToFoods = () => {
    history.push('/explore/foods');
  };

  const redirectToDrinks = () => {
    history.push('/explore/drinks');
  };

  return (
    <div>
      <Header title="Explore" />
      <button
        data-testid="explore-foods"
        type="button"
        onClick={ redirectToFoods }
      >
        Explore Foods
      </button>
      <button
        data-testid="explore-drinks"
        type="button"
        onClick={ redirectToDrinks }
      >
        Explore Drinks
      </button>
      <FooterMenu />
    </div>
  );
}
