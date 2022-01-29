import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RecepiesContext from './RecepiesContext';

export default function Provider({ children }) {
  const [resultAPI, setResultAPI] = useState([]);

  const context = { resultAPI, setResultAPI };
  return (
    <RecepiesContext.Provider value={ context }>
      {children}
    </RecepiesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;
