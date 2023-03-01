import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestLogin } from '../ApiCall/index';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{3})$/i;
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
      const response = await requestLogin('/login', { email, password });
      localStorage.setItem('user', JSON.stringify(response));
      navigate('/customer/products');
    } catch (error) {
      setErr(error);
    }
  };

  return (
    <div>
      <div>
        <div>
          Login
        </div>
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
        <button
          type="button"
          data-testid="common_login__button-register"
          onClick={ (() => navigate('/register')) }
        >
          Ainda não tenho conta
        </button>
      </div>
      <div>
        {
          err
          && (
            <p data-testid="common_login__element-invalid-email">
              { err?.response?.data?.message }
            </p>)
        }
      </div>
    </div>
  );
}

export default Login;
