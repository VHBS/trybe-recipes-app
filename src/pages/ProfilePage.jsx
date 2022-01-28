import React, { useState } from 'react';

export default function ProfilePage() {
  const [email] = useState('');

  return (
    <div>
      <span data-testid="profile-email">{email}</span>
      <button
        type="button"
        data-testid="profile-done-btn"
      >
        Receitas Feitas
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
      >
        Receitas Favoritas
      </button>

      <button
        type="button"
        data-testid="profile-logout-btn"
      >
        Sair
      </button>

    </div>
  );
}
