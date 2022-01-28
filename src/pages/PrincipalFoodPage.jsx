import React from 'react';

export default function PrincipalFoodPage() {
  return (
    <header>
      <h3 data-testid="page-title">Título da aplicação</h3>
      <button type="button" data-testid="profile-top-btn">Perfil</button>
      <button type="button" data-testid="search-top-btn">Search</button>
    </header>
  );
}
