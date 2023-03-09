import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { requestData, requestDelete } from '../utils/apiConnection';

function AllUsersTable({ allUsers }) {
  const [allUsersTable, setAllUsersTable] = useState([]);

  const items = [
    'Item',
    'Nome',
    'Email',
    'Tipo',
    'Excluir',
  ];

  useEffect(() => {
    if (allUsers.length > 0) {
      setAllUsersTable(allUsers);
    } else {
      requestData('/admin/users').then((response) => {
        setAllUsersTable(response);
      });
    }
  }, [allUsers]);

  const handleDeleteUser = (id) => {
    requestDelete(`/admin/users/${id}`)
      .then(() => {
        const newAllUsersTable = allUsersTable.filter((user) => user.id !== id);
        setAllUsersTable(newAllUsersTable);
      });
  };

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
            allUsersTable.map((element, index) => (
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
                  onClick={ (() => handleDeleteUser(element.id)) }
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

AllUsersTable.propTypes = {
  allUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
      role: PropTypes.string,
    }),
  ),
}.isRequired;

export default AllUsersTable;
