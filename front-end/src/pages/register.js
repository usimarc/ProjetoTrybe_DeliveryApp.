import React, { useState } from 'react';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{3})$/i;
    const passwordRegex = /^.{6,}$/;
    const twelve = 12;
    const nameRegex = name.length < twelve;
    const emailTest = emailRegex.test(email);
    const passwordTest = passwordRegex.test(password);
    setIsEmailValid(emailTest);
    setIsPasswordValid(passwordTest);
    setIsNameValid(nameRegex);
  }, [email, password, name]);

  useEffect(() => {
    if (isEmailValid && isPasswordValid && isNameValid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [isEmailValid, isPasswordValid, isNameValid]);

  const handleBtnOnClick = async () => {
    try {
      await requestLogin('/register', { name, email, password });
    } catch (error) {
      setErr(error);
    }
  };

  return (
    <div>
      <div>
        Nome
      </div>
      <input
        data-testid="common_register__input-name"
        type="name"
        placeholder="Digite seu nome"
        onChange={ (({ target }) => setName(target.value)) }
      />
      <div>
        Email
      </div>
      <input
        data-testid="common_register__input-email"
        type="email"
        placeholder="Digite seu email"
        onChange={ (({ target }) => setEmail(target.value)) }
      />
      <div>
        Senha
      </div>
      <input
        data-testid="common_register__input-password"
        type="password"
        placeholder="Digite sua senha"
        onChange={ (({ target }) => setPassword(target.value)) }
      />
      <button
        type="button"
        data-testid="common_register__button-resgister"
        onClick={ handleBtnOnClick }
        disabled={ disabled }
      >
        CADASTRAR

      </button>
      <p
        data-testid="common_login__element-invalid-register"
      >
        { err?.response.data.message }

      </p>
    </div>
  );
}

export default Register;
