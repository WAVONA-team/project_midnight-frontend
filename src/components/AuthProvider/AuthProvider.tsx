import { User } from 'project_midnight';

import React, { useMemo, useState } from 'react';

import { authClientActions } from '@/modules/Authorization/api/authClient';

type AuthContext = {
  user: User | null;
  isChecked: boolean;
  verify: (activationToken: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = React.createContext<AuthContext>({
  user: null,
  isChecked: true,
  verify: async () => {},
  checkAuth: async () => {},
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isChecked, setChecked] = useState(false);

  const verify = async (activationToken: string) => {
    const { accessToken, user } = (
      await authClientActions.verify(activationToken)
    ).data;

    localStorage.setItem('accessToken', accessToken);
    setUser(user);
  };

  const checkAuth = async () => {
    try {
      const { data } = await authClientActions.refresh();
      const { accessToken, user } = data;

      localStorage.setItem('accessToken', accessToken);
      setUser(user);
    } catch (error) {
      console.log('User is not authenticated');
    } finally {
      setChecked(true);
    }
  };

  const login = async (email: string, password: string) => {
    const { accessToken, user } = (
      await authClientActions.login(email, password)
    ).data;

    localStorage.setItem('accessToken', accessToken);
    setUser(user);
  };

  const register = async (email: string, password: string) => {
    await authClientActions
      .register(email, password)
      .then(({ data: user }) => setUser(user))
      .catch(() => console.log('registration error'))
      .finally(() => setChecked(true));
  };

  const logout = async () => {
    await authClientActions.logout();

    localStorage.removeItem('accessToken');
    setUser(null);
  };

  const value = useMemo(
    () => ({
      isChecked,
      user,
      checkAuth,
      verify,
      login,
      register,
      logout,
    }),
    [user, isChecked],
  );

>>>>>>> 5402b7d (feat(TAS-233): inegrating auth backend)
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
