import PropTypes from 'prop-types';
import React from 'react';
import RecepiesContext from './RecepiesContext';

export default function Provider({ children }) {
  return (
    <RecepiesContext.Provider value={ 0 }>
      {children}
    </RecepiesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;
