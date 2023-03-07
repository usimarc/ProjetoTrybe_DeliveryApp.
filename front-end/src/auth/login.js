import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestLogin } from '../utils/apiConnection';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handlingPageRedirect = (role) => {
    if (role === 'seller') return navigate('/seller/orders');

    return navigate('/customer/products');
  };

  const handleLogin = async () => {
    try {
      const response = await requestLogin('/login', { email, password });
      localStorage.setItem('user', JSON.stringify(response));
      return handlingPageRedirect(response.role);
    } catch (error) {
      setErr(error);
    }
  };

  const isValid = (paraEmail, paraPassword) => {
    const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{3})$/i;
    const passwordRegex = /^.{6,}$/;
    const emailTest = emailRegex.test(paraEmail);
    const passwordTest = passwordRegex.test(paraPassword);
    return emailTest && passwordTest;
  };

  const handleChangeEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handleChangePassword = ({ target }) => {
    setPassword(target.value);
  };

  useEffect(() => {
    setDisabled(!isValid(email, password));
  }, [email, password]);

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
          onChange={ handleChangeEmail }
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
          onChange={ handleChangePassword }
        />
      </div>
      <div>
        <button
          type="button"
          data-testid="common_login__button-login"
          disabled={ disabled }
          onClick={ handleLogin }
        >
          LOGIN
        </button>
      </div>
      <div>
        <button
          type="button"
          data-testid="common_login__button-register"
          onClick={ () => navigate('/register') }
        >
          Ainda não tenho conta
        </button>
      </div>
      <div>
        <p data-testid="common_login__element-invalid-email">
          { err?.response?.data?.message }
        </p>
      </div>
    </div>
  );
}

export default Login;
