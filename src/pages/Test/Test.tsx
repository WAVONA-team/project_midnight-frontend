import { User } from 'project_midnight';

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { httpClient } from '@/shared/api/httpClient';

import { AuthContext } from '@/components/AuthProvider/AuthProvider';

const TestPage: React.FC = React.memo(() => {
  const { user, logout } = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    httpClient.get('/users').then(({ data }) => setUsers(data));
  }, []);

  return (
    <>
      <p>user 123 {user?.id}</p>

      {users.map(({ id, email }, index) => {
        return (
          <p key={id}>
            index {index}
            <br />
            {email}
          </p>
        );
      })}

      <button type="button" onClick={() => logout()}>
        Logout
      </button>

      <Link to={'/'}>To main page (protected)</Link>
    </>
  );
});

export default TestPage;
