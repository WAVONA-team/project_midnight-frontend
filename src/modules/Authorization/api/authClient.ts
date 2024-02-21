import { createClient } from '@/shared/http';

import { ServerErrors } from '../types';

const authClient = createClient();

const register = async (email: string, password: string) => {
  return await authClient
    .post('/register', {
      email,
      password,
    })
    .catch((serverErrors) => {
      const { fieldErrors, formErrors }: ServerErrors =
        serverErrors.response.data;

      throw { fieldErrors, formErrors };
    });
};

const registerSpotify = () => {
  window.open(`${import.meta.env.VITE_API_BASE_URL}/auth/spotify`, '_self');
};

const verify = async (activationToken: string) => {
  return await authClient
    .get(`/verify/${activationToken}`)
    .catch((serverErrors) => {
      const { fieldErrors, formErrors }: ServerErrors =
        serverErrors.response.data;

      throw { fieldErrors, formErrors };
    });
};

const login = async (email: string, password: string) => {
  return await authClient
    .post('/login', {
      email,
      password,
    })
    .catch((serverErrors) => {
      const { fieldErrors, formErrors }: ServerErrors =
        serverErrors.response.data;

      throw { fieldErrors, formErrors };
    });
};

const refresh = async () => {
  return authClient.get('/refresh');
};

const logout = async () => {
  return await authClient.post('/logout');
};

export const authClientActions = {
  register,
  registerSpotify,
  verify,
  login,
  refresh,
  logout,
};
