import { useStore } from '@/store';
import { User } from 'project_midnight';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { httpClient } from '@/shared/api/httpClient';

const TestPage: React.FC = React.memo(() => {
  const { logout, user } = useStore(({ logout, user }) => ({
    logout,
    user,
  }));
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
