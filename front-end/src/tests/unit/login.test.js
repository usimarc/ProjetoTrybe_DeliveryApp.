import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../../App';

describe('Login screen tests:', () => {
  it('testing the Email and Password input elements', () => {
    // const { history } = renderWithRouter(<App />);
    // history.push('/login');

    renderWithRouter(<App />, { route: '/login' });
    const inputEmail = screen.getByTestId('common_login__input-email');
    const inputPass = screen.getByTestId('common_login__input-password');

    expect(inputEmail).toBeInTheDocument();
    expect(inputPass).toBeInTheDocument();
  });

  it('Login and Registration buttons rendered', () => {
    renderWithRouter(<App />, { route: '/login' });

    const loginBtn = screen.getByTestId('common_login__button-login');
    const registerBtn = screen.getByTestId('common_login__button-register');

    expect(loginBtn).toBeInTheDocument();
    expect(registerBtn).toBeInTheDocument();
  });

  it('Login button is disabled', () => {
    renderWithRouter(<App />, { route: '/login' });

    const inputEmail = screen.getByTestId('common_login__input-email');
    const inputPass = screen.getByTestId('common_login__input-password');
    const loginBtn = screen.getByTestId('common_login__button-login');

    expect(loginBtn).toBeDisabled();

    userEvent.type(inputEmail, 'leandrojamir@t');
    userEvent.type(inputPass, '1234');

    expect(loginBtn).toBeDisabled();
  });
});
