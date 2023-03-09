import { useState, useEffect } from 'react';
import { requestData, requestDelete } from '../utils/apiConnection';

function AllUsersTable() {
  const [allUsers, setAllUsers] = useState([]);

  const items = [
    'Item',
    'Nome',
    'Email',
    'Tipo',
    'Excluir',
  ];

  useEffect(() => {
    requestData('/admin/users')
      .then((response) => {
        setAllUsers(response);
      });
  }, [allUsers]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {
              items.map((element, i) => (
                <th key={ i }>
                  {element}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            allUsers.map((element, index) => (
              <tr key={ index }>
                <th
                  data-testid={
                    `admin_manage__element-user-table-item-number-${index}`
                  }
                >
                  {index + 1}
                </th>
                <th
                  data-testid={
                    `admin_manage__element-user-table-name-${index}`
                  }
                >
                  {element.name}
                </th>
                <th
                  data-testid={
                    `admin_manage__element-user-table-email-${index}`
                  }
                >
                  {element.email}
                </th>
                <th
                  data-testid={
                    `admin_manage__element-user-table-role-${index}`
                  }
                >
                  {element.role}
                </th>
                <button
                  type="button"
                  data-testid={
                    `admin_manage__element-user-table-remove-${index}`
                  }
                  onClick={ (() => requestDelete(`/admin/users/${element.id}`)) }
                >
                  Excluir
                </button>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default AllUsersTable;
