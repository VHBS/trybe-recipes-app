import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import InputsRecipesProgressFood from '../components/InputsRecipesProgressFood';
import ShareButton from '../components/ShareButton';
import RecepiesContext from '../context/RecepiesContext';

const DETAILS_FOOD_API = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const INGREDIENT_QUANTITY = 20;

export default function FoodInProgress() {
  const { detailProduct, setDetailProduct } = useContext(RecepiesContext);
  const [ingredients, setIngredients] = useState([]);
  const [doneRecipe, setDoneRecipe] = useState(true);
  const { id } = useParams();
  let product;

  useEffect(() => {
    const requisitionById = (url, value) => {
      fetch(`${url}${value}`)
        .then((response) => response.json())
        .then((data) => {
          setDetailProduct(data);
          const ingredientsArr = [];
          for (let i = 1; i < INGREDIENT_QUANTITY; i += 1) {
            const igred = data.meals[0][`strIngredient${i}`];
            const quantity = data.meals[0][`strMeasure${i}`];
            if (igred !== '' && igred !== null && igred !== undefined) {
              ingredientsArr.push(`${igred} - ${quantity}`);
            }
          }
          setIngredients(ingredientsArr);
        })
        .catch(() => []);
    };

    requisitionById(DETAILS_FOOD_API, id);
  }, [id, setDetailProduct]);

  if (detailProduct.meals) {
    const [firstItem] = detailProduct.meals;
    product = firstItem;
  }

  return (
    <div>
      {product && (
        <>
          <img
            data-testid="recipe-photo"
            src={ product.strMealThumb }
            alt={ product.strMeal }
          />
          <h2 data-testid="recipe-title">{product.strMeal}</h2>
          <ShareButton />
          <FavoriteButton />
          <p data-testid="recipe-category">{product.strCategory}</p>
          <div id="ingredients-container">
            <InputsRecipesProgressFood
              ingredients={ ingredients }
              setDoneRecipe={ setDoneRecipe }
            />
          </div>
          <p data-testid="instructions">{product.strInstructions}</p>
          <button
            data-testid="finish-recipe-btn"
            type="button"
            disabled={ doneRecipe }
          >
            Finish Recipe
          </button>
        </>
      )}
    </div>
  );
}
