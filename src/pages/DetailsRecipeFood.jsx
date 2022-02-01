import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecepiesContext from '../context/RecepiesContext';

const DETAILS_FOOD_API = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const INGREDIENT_QUANTITY = 20;
const RECOMENDATION = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const RECOMENDATION_SIZE = 6;

export default function DetailsRecipeFood() {
  const { detailProduct, setDetailProduct } = useContext(RecepiesContext);
  const [ingredients, setIngredients] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const { id } = useParams();
  const history = useHistory();
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
    const recomendationFetch = () => {
      fetch(RECOMENDATION)
        .then((response) => response.json())
        .then((data) => {
          setRecomendation(data.drinks.slice(0, RECOMENDATION_SIZE));
        });
    };
    recomendationFetch();
  }, [id, setDetailProduct, setRecomendation]);

  if (detailProduct.meals) {
    const { meals: [firstItem] } = detailProduct;
    product = firstItem;
  }

  return (
    <div>
      { detailProduct.meals && (
        <div>
          <img
            data-testid="recipe-photo"
            src={ product.strMealThumb }
            alt={ product.strMeal }
          />
          <h2 data-testid="recipe-title">{product.strMeal}</h2>
          <button data-testid="share-btn" type="button">
            compartilhar
          </button>
          <p data-testid="recipe-category">{product.strCategory}</p>
          { ingredients.map((item, index) => (
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ item + index }
            >
              {item}
            </p>
          )) }
          <button data-testid="favorite-btn" type="button"> Favoritar</button>
          <p data-testid="recipe-category">{product.strCategory}</p>
          <p data-testid="instructions">{product.strInstructions}</p>
          <iframe
            src={ product.strYoutube.replace('watch?v=', 'embed/') }
            frameBorder="0"
            allowFullScreen
            title="video"
            data-testid="video"
          />
          <button
            data-testid="start-recipe-btn"
            type="button"
            className="init-recepie"
            onClick={ () => history.push(`/foods/${id}/in-progress`) }
          >
            Start Recipe
          </button>
          <div className="recomendation-container">
            {recomendation && recomendation.map((item, index) => (
              <div
                className="recomendation-img"
                data-testid={ `${index}-recomendation-card` }
                key={ item.idDrink }
              >
                <h2 data-testid={ `${index}-recomendation-title` }>{item.strDrink}</h2>
                <img src={ item.strDrinkThumb } alt={ item.strDrink } />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
