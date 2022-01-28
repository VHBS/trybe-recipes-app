import React from 'react';
import { useParams } from 'react-router-dom';

export default function DetailsRecipeFood() {
  const { id } = useParams();
  console.log(id);

  return (
    <div>
      <h2>Detalhes</h2>
    </div>
  );
}
