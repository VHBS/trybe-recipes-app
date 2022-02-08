import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';
import ExplorerButton from '../components/ExplorerButton';
import { getRandomDrink } from '../Services/UseAPI';

export default function ExplorerDrink() {
  const [resultAPI, setResultAPI] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function fetchAPI() {
      const result = await getRandomDrink().then((response) => response);
      setResultAPI(result[0]);
    }
    fetchAPI();
  }, []);

  const redirectToExpDrink = () => {
    history.push('/explore/drinks/ingredients');
  };

  const redirectToDrinkDetails = () => {
    history.push(`/drinks/${resultAPI.idDrink}`);
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
      <ExplorerButton
        dataTestid="explore-surprise"
        route={ `/drinks/${resultAPI.idDrink}` }
        text="Surprise me!"
        onClick={ redirectToDrinkDetails }
      />
      <FooterMenu />
    </div>);
}
