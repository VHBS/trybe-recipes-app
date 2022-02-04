import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import InputsRecipesProgressDrink from '../components/InputsRecipesProgressDrink';
import ShareButton from '../components/ShareButton';
import RecepiesContext from '../context/RecepiesContext';

const DETAILS_DRINK_API = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const INGREDIENT_QUANTITY = 20;

export default function DrinkInProgress() {
  const { detailProduct, setDetailProduct } = useContext(RecepiesContext);
  const [ingredients, setIngredients] = useState([]);
  const [doneRecipe, setDoneRecipe] = useState(true);
  const history = useHistory();
  const { id } = useParams();
  let product;

  useEffect(() => {
    const requisitionById = (url, value) => {
      fetch(`${url}${value}`)
        .then((response) => response.json())
        .then((data) => {
          const ingredientsArr = [];
          setDetailProduct(data);
          for (let i = 1; i < INGREDIENT_QUANTITY; i += 1) {
            const igred = data.drinks[0][`strIngredient${i}`];
            const quantity = data.drinks[0][`strMeasure${i}`];
            if (igred !== '' && igred !== null && igred !== undefined) {
              ingredientsArr.push(`${igred} - ${quantity}`);
            }
          }
          setIngredients(ingredientsArr);
        });
    };

    requisitionById(DETAILS_DRINK_API, id);
  }, [id, setDetailProduct]);

  if (detailProduct.drinks) {
    const { drinks: [firstItem] } = detailProduct;
    product = firstItem;
  }

  const finishRecipeClick = () => {
    let doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!doneRecipes) {
      doneRecipes = [{
        id: product.idDrink,
        type: 'drink',
        nationality: '',
        category: product.strCategory,
        alcoholicOrNot: product.strAlcoholic,
        name: product.strDrink,
        image: product.strDrinkThumb,
        doneDate: '',
        tags: product.strTags,
      }];
    } else {
      doneRecipes = [...doneRecipes, {
        id: product.idMeal,
        type: 'food',
        nationality: product.strArea,
        category: product.strCategory,
        alcoholicOrNot: '',
        name: product.strMeal,
        image: product.strMealThumb,
        doneDate: '',
        tags: product.strTags,
      }];
    }
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    history.push('/done-recipes');
  };

  return (
    <div>
      {product && (
        <>
          <img
            data-testid="recipe-photo"
            src={ product.strDrinkThumb }
            alt={ product.strDrink }
          />
          <h2 data-testid="recipe-title">{product.strDrink}</h2>
          <ShareButton />
          <FavoriteButton />
          <p data-testid="recipe-category">{product.strCategory}</p>
          <InputsRecipesProgressDrink
            ingredients={ ingredients }
            setDoneRecipe={ setDoneRecipe }
          />
          <p data-testid="instructions">{product.strInstructions}</p>
          <button
            data-testid="finish-recipe-btn"
            type="button"
            disabled={ doneRecipe }
            onClick={ finishRecipeClick }
          >
            Finish Recipe
          </button>
        </>
      )}
    </div>
  );
}
