import React, { useState, useEffect } from 'react';
import { requestLogin } from '../ApiCall/index';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const passwordRegex = /^.{6,}$/;
    const emailTest = emailRegex.test(email);
    const passwordTest = passwordRegex.test(password);
    setIsEmailValid(emailTest);
    setIsPasswordValid(passwordTest);
  }, [email, password]);

  useEffect(() => {
    if (isEmailValid && isPasswordValid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [isEmailValid, isPasswordValid]);

  const handleBtnOnClick = async () => {
    try {
      await requestLogin('/login', { email, password });
    } catch (error) {
      if (error) {
        console.log(error);
        setErr(error);
      }
    }
  };

  return (
    <div>
      <div>
        <div>
          Login
        </div>
        {/* common_login__input-email */}
        <input
          data-testid="common_login__input-email"
          type="email"
          name="Login"
          placeholder="email@trybeer.com.br"
          onChange={ (({ target }) => setEmail(target.value)) }
        />
      </div>
      <div>
        <div>
          Senha
        </div>
        <input
          data-testid="common_login__input-password"
          type="password"
          name="Senha"
          placeholder="***********"
          onChange={ (({ target }) => setPassword(target.value)) }
        />
      </div>
      <div>
        <button
          type="button"
          data-testid="common_login__button-login"
          disabled={ disabled }
          onClick={ handleBtnOnClick }
        >
          LOGIN
        </button>
      </div>
      <div>
        <button type="button" data-testid="common_login__button-register">
          Ainda não tenho conta
        </button>
      </div>
      <div>
        {
          err
          && (
            <p data-testid="common_login__element-invalid-email">
              { err?.response.request.statusText }
            </p>)
        }
      </div>
    </div>
  );
}

export default Login;
