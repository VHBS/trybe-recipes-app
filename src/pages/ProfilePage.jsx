import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';

export default function ProfilePage() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const saveEmail = JSON.parse(localStorage.getItem('user')).email;
      setEmail(saveEmail);
    }
  }, []);

  const redirectToFavorites = () => {
    history.push('/favorite-recipes');
  };

  const redirectToDone = () => {
    history.push('/done-recipes');
  };

  const redirectToLogin = () => {
    history.push('/');
    localStorage.clear();
  };

  return (
    <div>
      <Header title="Profile" />
      <span data-testid="profile-email">{email}</span>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ redirectToDone }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ redirectToFavorites }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ redirectToLogin }
      >
        Logout
      </button>
      <FooterMenu />
    </div>
  );
}

// teste
