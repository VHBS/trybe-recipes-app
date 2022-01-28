import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header(props) {
  const [showInput, setShowInput] = useState(false);

  const { title, search } = props;
  const history = useHistory();

  const handleClick = () => {
    history.push('/profile');
  };

  return (
    <header>
      <h3 data-testid="page-title">{title}</h3>
      <button
        type="button"
        data-testid="profile-top-btn"
        src={ profileIcon }
        onClick={ handleClick }
      >
        <img src={ profileIcon } alt="icone para perfil" />
      </button>
      {search && (
        <div>
          <button
            type="button"
            data-testid="search-top-btn"
            src={ searchIcon }
            onClick={ () => setShowInput(!showInput) }
          >
            <img src={ searchIcon } alt="icone para pesquisar" />
          </button>
          { showInput && <input data-testid="search-input" type="text" />}
        </div>
      ) }

    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;
