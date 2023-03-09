import React, { useState, useEffect } from 'react';
import { requestData, requestLogin } from '../../utils/apiConnection';
import Navbar from '../../customers/components/navBar';
import AllUsersTable from '../../components/allUsers';

function AdminManageUsers() {
  const [err, setErr] = useState('');
  const [name, setName] = useState('');
  const [admName, setAdmName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [disabled, setDisabled] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const handleBtnOnClick = async () => {
    try {
      const newUser = await requestLogin('/admin/register', {
        name, email, password, role,
      });
      setUsers([...users, newUser]);
      setName('');
      setEmail('');
      setPassword('');
      setRole('seller');
      const response = await requestData('/admin/users');
      setAllUsers(response);
    } catch (error) {
      setErr(error);
    }
  };

  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)(\.br)?$/i;
    const passwordRegex = /^.{6,}$/;
    const twelve = 12;
    const nameRegex = name.length >= twelve;
    const emailTest = emailRegex.test(email);
    const passwordTest = passwordRegex.test(password);
    setIsEmailValid(emailTest);
    setIsPasswordValid(passwordTest);
    setIsNameValid(nameRegex);
  }, [email, password, name]);

  useEffect(() => {
    const getName = JSON.parse(localStorage.getItem('user'));
    if (getName) {
      setAdmName(getName.name);
    }

    if (isEmailValid && isPasswordValid && isNameValid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [isEmailValid, isPasswordValid, isNameValid]);

  return (
    <div>
      <Navbar name={ admName } />
      <div>
        <p data-testid="admin_manage__element-invalid-register">
          { err?.response?.data?.message }
        </p>
      </div>
      <fieldset>
        <legend>Cadastrar novo usuário</legend>
        <br />
        <div>
          Nome
          <input
            data-testid="admin_manage__input-name"
            type="text"
            placeholder="Nome e sobrenome"
            value={ name }
            onChange={ ({ target }) => setName(target.value) }
          />

          Email
          <input
            data-testid="admin_manage__input-email"
            type="email"
            placeholder="seu-email@site.com.br"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />

          Senha
          <input
            data-testid="admin_manage__input-password"
            type="password"
            placeholder="**********"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />

          Tipo
          <select
            data-testid="admin_manage__select-role"
            type="text"
            placeholder="Vendedor"
            value={ role }
            onChange={ ({ target }) => setRole(target.value) }
          >
            <option value="seller">Vendedor</option>
            <option value="administrator">Administrador</option>
            <option value="customer">Cliente</option>
          </select>
          <button
            data-testid="admin_manage__button-register"
            type="button"
            onClick={ handleBtnOnClick }
            disabled={ disabled }
          >
            CADASTRAR
          </button>
        </div>
      </fieldset>
      <AllUsersTable allUsers={ allUsers } />
    </div>
  );
}

export default AdminManageUsers;
