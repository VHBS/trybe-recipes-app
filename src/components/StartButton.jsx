import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

export default function StartButton() {
  const { id } = useParams();
  const history = useHistory();
  return (
    <button
      data-testid="start-recipe-btn"
      type="button"
      className="init-recepie"
      onClick={ () => history.push(`/foods/${id}/in-progress`) }
    >
      Start Recipe
    </button>
  );
}
