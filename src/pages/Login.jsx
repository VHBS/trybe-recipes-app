import React, { useState } from 'react';

export default function Login() {
  // const CHECK_PASSWORD = 6;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [ ]
  // const history = useHistory();

  // const validInput = 6;

  // const checkEmail = () => {
  //   if (email.includes('@') && email.includes('.com')) {
  //     return console.log('email check');
  //   }
  // };

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

  return (
    <div>
      <h1>ué</h1>
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
      >
        Enter
      </button>
    </div>
  );
}
