import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router';

export default function ExplorerButton({ dataTestid, route, text }) {
  const history = useHistory();
  return (
    <button
      type="button"
      data-testid={ dataTestid }
      onClick={ () => history.push(route) }
    >
      { text }
    </button>
  );
}

ExplorerButton.propTypes = {
  dataTestid: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
