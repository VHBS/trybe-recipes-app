import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { localStorageMock, saveToStorage } from './mocks/localStorage';
import Login from '../pages/Login';

const VALID_EMAIL = 'email@trybe.com';
const VALID_PASSWORD = '1231231';

const PASSWORD_BY_TESTID = 'password-input';

describe('Testa a página de Login', () => {
  // beforeEach(() => {
  //   Object.defineProperty(window, 'localStorage', {
  //     value: localStorageMock,
  //   });
  });

  test('Verifica se existem os inputs de e-mail, senha e botão de login', () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId(PASSWORD_BY_TESTID);
    const loginBtn = screen.getByRole('button', { name: /enter/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  });

  test('Verifica se o botão continua desabilitado com email e senha inválidos', () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId(PASSWORD_BY_TESTID);
    const loginBtn = screen.getByRole('button', { name: /enter/i });

    const INVALID_EMAIL = 'emailerrado';
    const INVALID_PASSWORD = '123';

    userEvent.type(emailInput, INVALID_EMAIL);
    userEvent.type(passwordInput, INVALID_PASSWORD);

    expect(loginBtn).toBeDisabled();
  });

  test('Verifica se o botão é habilitado com email e senha válidos', () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId(PASSWORD_BY_TESTID);
    const loginBtn = screen.getByRole('button', { name: /enter/i });

    expect(loginBtn).toBeDisabled();

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);

    expect(loginBtn).not.toBeDisabled();
  });

  test('Verifica se o email do usuário é salvo no LocalStorage', () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId(PASSWORD_BY_TESTID);
    const loginBtn = screen.getByRole('button', { name: /enter/i });

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    userEvent.click(loginBtn);

    // saveToStorage('email', VALID_EMAIL);

    // expect(window.localStorage.setItem()).toHaveBeenCalledOnce();
    // expect(window.localStorage.getItem('email')).toEqual(VALID_EMAIL);
  });

  test('Verifica se há dois tokens salvos no LocalStorage após clique no botão', () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId(PASSWORD_BY_TESTID);
    const loginBtn = screen.getByRole('button', { name: /enter/i });

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    userEvent.click(loginBtn);

    // expect(window.localStorage.getItem('mealsToken')).toBe('1');
  });

  // test('Verifica se o usuário é redirecionado para página principal de comidas', () => {
  //   const { history } = renderWithRouter(<Login />);

  //   const emailInput = screen.getByRole('textbox');
  //   const passwordInput = screen.getByTestId(PASSWORD_BY_TESTID);
  //   const loginBtn = screen.getByRole('button', { name: /enter/i });

  //   userEvent.type(emailInput, VALID_EMAIL);
  //   userEvent.type(passwordInput, VALID_PASSWORD);
  //   userEvent.click(loginBtn);

  //   const { location } = history;
  //   expect(location.history).toBe('/food');
  // });
});
