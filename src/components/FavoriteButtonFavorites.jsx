import PropTypes from 'prop-types';
import React from 'react';

export default function FavoriteButtonFavorites({ item }) {
  return (
    <div>
      <h2>{console.log(item)}</h2>
    </div>
  );
}

FavoriteButtonFavorites.propTypes = {
  item: PropTypes.any,
}.isRequired;
