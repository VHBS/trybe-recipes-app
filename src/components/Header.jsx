import PropTypes from 'prop-types';
import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header(props) {
  const { title, search } = props;

  return (
    <header>
      <h3 data-testid="page-title">{title}</h3>
      <button type="button" data-testid="profile-top-btn" src={ profileIcon }>
        <img src={ profileIcon } alt="icone para perfil" />
      </button>
      {search && (
        <button type="button" data-testid="search-top-btn" src={ searchIcon }>
          <img src={ searchIcon } alt="icone para pesquisar" />
        </button>) }

    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;
