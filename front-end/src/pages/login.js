import React, { useState, useEffect } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

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
        <p data-testid="common_login__element-invalid-email">
          Elemento oculto (Mensagens de erro)
        </p>
      </div>
    </div>
  );
}

export default Login;
