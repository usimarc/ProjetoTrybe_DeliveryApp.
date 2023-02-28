import React from 'react';

function Register() {
  return (
    <div>
      <div>
        Nome
      </div>
      <input
        data-testid="common_register__input-name"
        type="name"
      />
      <div>
        Email
      </div>
      <input
        data-testid="common_register__input-email"
        type="email"
      />
      <div>
        Senha
      </div>
      <input
        data-testid="common_register__input-password"
        type="password"
      />
      <button
        type="button"
        data-testid="common_register__button-resgister"
      >
        CADASTRAR

      </button>
      <p
        data-testid="common_login__element-invalid-register"
      >
        Elemento inválido

      </p>
    </div>
  );
}

export default Register;
