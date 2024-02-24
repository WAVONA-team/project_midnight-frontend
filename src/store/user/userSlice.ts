import { NormalizedUser, UserWithAccessToken } from 'project_midnight';
import { StateCreator } from 'zustand';

import { ServerErrors } from '@/shared/types/ServerErrors';

import { createClient } from '@/shared/http';

import { UserState } from './UserState';

const authClient = createClient();

export const createUserSlice: StateCreator<UserState> = (set) => ({
  user: null,
  isChecked: false,
  register: async (email: string, password: string) => {
    return await authClient
      .post<NormalizedUser>('/register', {
        email,
        password,
      })
      .then(({ data: user }) => {
        return user;
      })
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors = serverErrors.response.data;

        throw { fieldErrors, formErrors };
      })
      .finally(() => set({ isChecked: true }));
  },
  verify: async (activationToken: string) => {
    return await authClient
      .get<UserWithAccessToken>(`/verify/${activationToken}`)
      .then(({ data }) => {
        set({ user: data.user });
        localStorage.setItem('accessToken', data.accessToken);

        return data;
      })
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;

        throw { fieldErrors, formErrors };
      });
  },
  registerSpotify: () => {
    return window.open(
      `${import.meta.env.VITE_API_BASE_URL}/auth/spotify`,
      '_self',
    );
  },
  login: async (email: string, password: string) => {
    return await authClient
      .post<UserWithAccessToken>('/login', {
        email,
        password,
      })
      .then(({ data }) => {
        set({ user: data.user });
        localStorage.setItem('accessToken', data.accessToken);

        return data;
      })
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;

        throw { fieldErrors, formErrors };
      });
  },
  logout: async () => {
    return await authClient.post('/logout').then((res) => {
      set({ user: null });
      localStorage.removeItem('accessToken');

      return res;
    });
  },
  checkAuth: async () => {
    return authClient
      .get<UserWithAccessToken>('/refresh')
      .then(({ data }) => {
        set({ user: data.user });
        localStorage.setItem('accessToken', data.accessToken);

        return data;
      })
      .catch(() => console.log('User is not authorized'))
      .finally(() => set({ isChecked: true }));
  },
});

export { type UserState } from './UserState';
