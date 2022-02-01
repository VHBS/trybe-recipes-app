import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';
import RecepiesContext from '../context/RecepiesContext';

const ALL_INGREDIENTS_API = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const MAGIC_NUMBER = 12;

export default function ExploreByIngredientFood() {
  const { mealIngredients, setMealIngredients } = useContext(RecepiesContext);
  const history = useHistory();

  const imgSrc = (i) => `https://www.themealdb.com/images/ingredients/${i}-Small.png`;

  useEffect(() => {
    const fetchIngredients = () => fetch(ALL_INGREDIENTS_API)
      .then((res) => res.json())
      .then((data) => {
        const slice = data.meals.slice(0, MAGIC_NUMBER);
        setMealIngredients(slice);
      });

    fetchIngredients();
  }, [setMealIngredients]);

  const handleRedirect = (value) => {
    history.push({
      pathname: '/foods',
      state: value,
    });
  };

  return (
    <div>
      <Header title="Explore Ingredients" />
      { mealIngredients && mealIngredients.length > 0
        ? mealIngredients.map((e, i) => (
          <button
            type="button"
            data-testid={ `${i}-ingredient-card` }
            key={ e.idIngredient }
            // F para identificação como FOOD no history.push()
            onClick={ () => handleRedirect(`F${e.strIngredient}`) }
          >
            <h2
              data-testid={ `${i}-card-name` }
            >
              { e.strIngredient }
            </h2>
            <img
              src={ imgSrc(e.strIngredient) }
              alt="meal ingredient"
              data-testid={ `${i}-card-img` }
              width="100vw"
            />
          </button>
        )) : null }
      <FooterMenu />
    </div>);
}
