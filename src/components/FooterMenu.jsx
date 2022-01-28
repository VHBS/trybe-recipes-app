import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function FooterMenu() {
  return (
    <footer id="footer" data-testid="footer">
      <button type="button" data-testid="drinks-bottom-btn" src={ drinkIcon }>
        <img src={ drinkIcon } alt="icone para bebidas" />
      </button>
      <button type="button" data-testid="explore-bottom-btn" src={ exploreIcon }>
        <img src={ exploreIcon } alt="icone para exploracao" />
      </button>
      <button type="button" data-testid="food-bottom-btn" src={ mealIcon }>
        <img src={ mealIcon } alt="icone para comidas" />
      </button>
    </footer>
  );
}
