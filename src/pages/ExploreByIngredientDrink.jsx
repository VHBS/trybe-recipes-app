import React, { useContext, useEffect } from 'react';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';
import RecepiesContext from '../context/RecepiesContext';

const ALL_INGREDIENTS_API = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
const MAGIC_NUMBER = 12;

export default function ExploreByIngredientDrink() {
  const { drinkIngredients, setDrinkIngredients } = useContext(RecepiesContext);

  const imgSrc = (i) => `https://www.thecocktaildb.com/images/ingredients/${i}-small.png`;

  useEffect(() => {
    const fetchIngredients = () => fetch(ALL_INGREDIENTS_API)
      .then((res) => res.json())
      .then((data) => {
        const slice = data.drinks.slice(0, MAGIC_NUMBER);
        setDrinkIngredients(slice);
      });

    fetchIngredients();
  }, [setDrinkIngredients]);

  return (
    <div>
      <Header title="Explore Ingredients" />
      { drinkIngredients && drinkIngredients.length > 0
        ? drinkIngredients.map((e, i) => (
          <button
            type="button"
            key={ e.strIngredient1 }
            data-testid={ `${i}-ingredient-card` }
          >
            <h2 data-testid={ `${i}-card-name` }>{ e.strIngredient1 }</h2>
            <img
              src={ imgSrc(e.strIngredient1) }
              alt="drink ingredient"
              data-testid={ `${i}-card-img` }
            />
          </button>
        )) : null}
      <FooterMenu />
    </div>);
}
