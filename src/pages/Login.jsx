import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const validation = () => {
    let result = true;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const MIN_PASSWORD_LENGTH = 6;
    if (password.length > 0) {
      if (password.length > MIN_PASSWORD_LENGTH && regex.test(email)) {
        result = false;
      } else {
        result = true;
      }
    }
    return result;
  };

  const submission = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));

    history.push('/foods');
  };

  return (
    <div>
      <input
        data-testid="email-input"
        onChange={ (e) => setEmail(e.target.value) }
        value={ email }
        type="text"
      />
      <input
        data-testid="password-input"
        onChange={ (e) => setPassword(e.target.value) }
        value={ password }
        type="password"
      />
      <button
        disabled={ validation() }
        data-testid="login-submit-btn"
        type="button"
        onClick={ () => submission() }
      >
        Enter
      </button>
    </div>
  );
}
