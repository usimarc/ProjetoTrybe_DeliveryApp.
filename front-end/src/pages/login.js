// 1 - Crie uma tela de login que deve ser acessível pelos endpoints / e /login no navegador
import React from 'react';

// 2 - Crie os elementos da tela de login com os data-testids disponíveis no protótipo
// Observações técnicas
// Se oriente pela seguinte tela do protótipo: Comum / Login;
// Construção do Front-end
// Utilize o arquivo prototype.fig contido na raiz do projeto para se guiar na construção do front-end. Se trata de um arquivo do Figma que contém um layout base e os data-testids de cada elemento.
// warningImportante: para visualizar o protótipo, é necessário fazer login no Figma e importar o arquivo.
// https://www.figma.com/file/def0R0EBuVwiX3HofHYIeL/prototype?node-id=990%3A774&t=lqRK0iBhQoZ80X1w-0
function Login() {
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
        />
      </div>
      <div>
        <div>
          Senha
        </div>
        {/* common_login__input-password */}
        <input
          data-testid="common_login__input-password"
          type="password"
          name="Senha"
          placeholder="***********"
        />
      </div>
      <div>
        {/* common_login__button-login */}
        <button type="button" data-testid="common_login__button-login">
          LOGIN
        </button>
      </div>
      <div>
        {/* common_login__button-register */}
        <button type="button" data-testid="common_login__button-register">
          Ainda não tenho conta
        </button>
      </div>
      <div>
        {/* common_login__element-invalid-email */}
        <p data-testid="common_login__element-invalid-email">
          Elemento oculto (Mensagens de erro)
        </p>
      </div>
    </div>
  );
}

export default Login;
