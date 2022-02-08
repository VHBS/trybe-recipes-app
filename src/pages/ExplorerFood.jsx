import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';
import ExplorerButton from '../components/ExplorerButton';
import { getRandomFood } from '../Services/UseAPI';

export default function ExplorerFood() {
  const [resultAPI, setResultAPI] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function fetchAPI() {
      const result = await getRandomFood().then((response) => response);
      setResultAPI(result[0]);
    }
    fetchAPI();
  }, []);

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
      <ExplorerButton
        dataTestid="explore-surprise"
        route={ `/foods/${resultAPI.idMeal}` }
        text="Surprise me!"
        onClick={ redirectToFoodDetails }
      />
      <FooterMenu />
    </div>
  );
}
