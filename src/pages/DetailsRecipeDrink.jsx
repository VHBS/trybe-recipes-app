import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FavoriteButtonDetails from '../components/FavoriteButtonDetails';
import ShareButton from '../components/ShareButton';
import StartButton from '../components/StartButton';
import RecepiesContext from '../context/RecepiesContext';

const DETAILS_DRINK_API = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const INGREDIENT_QUANTITY = 20;
const RECOMENDATION = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const RECOMENDATION_SIZE = 6;

export default function DetailsRecipeDrink() {
  const { detailProduct, setDetailProduct } = useContext(RecepiesContext);
  const [ingredients, setIngredients] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const { id } = useParams();
  let product;

  const ingredientsFunc = (ingredient) => {
    const ingredientsArr = [];
    for (let i = 1; i < INGREDIENT_QUANTITY; i += 1) {
      const igred = ingredient[`strIngredient${i}`];
      const quantity = ingredient[`strMeasure${i}`];
      if (igred !== '' && igred !== null && igred !== undefined
      && quantity !== '' && quantity !== null && quantity !== undefined) {
        ingredientsArr.push(`${igred} - ${quantity}`);
      } else if (igred !== '' && igred !== null && igred !== undefined) {
        ingredientsArr.push(`${igred}`);
      }
    }
    setIngredients(ingredientsArr);
  };

  useEffect(() => {
    const requisitionById = (url, value) => {
      fetch(`${url}${value}`)
        .then((response) => response.json())
        .then((data) => {
          setDetailProduct(data);
          ingredientsFunc(data.drinks[0]);
        });
    };

    requisitionById(DETAILS_DRINK_API, id);
    const recomendationFetch = () => {
      fetch(RECOMENDATION)
        .then((response) => response.json())
        .then((data) => {
          setRecomendation(data.meals.slice(0, RECOMENDATION_SIZE));
        });
    };
    recomendationFetch();
  }, [id, setDetailProduct, setRecomendation]);

  if (detailProduct.drinks) {
    const { drinks: [firstItem] } = detailProduct;
    product = firstItem;
  }

  return (
    <div>
      { detailProduct.drinks && (
        <div>
          <img
            data-testid="recipe-photo"
            src={ product.strDrinkThumb }
            alt={ product.strDrink }
          />
          <h2 data-testid="recipe-title">{product.strDrink}</h2>
          <ShareButton />
          <p data-testid="recipe-category">{product.strCategory}</p>
          { ingredients.map((item, index) => (
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ item + index }
            >
              {item}
            </p>
          )) }
          <FavoriteButtonDetails />
          <p data-testid="recipe-category">{product.strAlcoholic}</p>
          <p data-testid="instructions">{product.strInstructions}</p>
          <p>{product.strAlcoholic}</p>
          <StartButton ingredients={ ingredients } />
          <div className="recomendation-container">
            {recomendation && recomendation.map((item, index) => (
              <div
                className="recomendation-img"
                data-testid={ `${index}-recomendation-card` }
                key={ item.idMeal }
              >
                <h2 data-testid={ `${index}-recomendation-title` }>{item.strMeal}</h2>
                <img src={ item.strMealThumb } alt={ item.strMeal } />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
