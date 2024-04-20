import {
  type NormalizedUser,
  Track,
  type UserWithAccessToken,
} from 'project_midnight';
import { StateCreator } from 'zustand';

import { httpClient } from '@/shared/api/httpClient';
import { createClient } from '@/shared/http';
import { ServerErrors } from '@/shared/types/ServerErrors';

import { UserState } from '@/modules/Authorization/store/types/UserState';

const authClient = createClient();

export const createUserSlice: StateCreator<UserState> = (set) => ({
  user: null,
  userTracks: [],
  isUserTracksLoading: true,
  isChecked: false,
  setIsUserTracksLoading: (state) => {
    set({ isUserTracksLoading: state });
  },
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
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;

        throw { fieldErrors, formErrors };
      })
      .finally(() => set({ isChecked: true }));
  },
  registerVerify: async (activationToken: string | null) => {
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

  getTracksByUser: async (userId: string, page: string) => {
    set({ isUserTracksLoading: true });

    return await httpClient
      .get<Track[]>(`/users/tracks/${userId}?page={${page}`)
      .then(({ data }) => {
        set((state) => ({ userTracks: [...state.userTracks, ...data] }));

        return data;
      })
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;

        throw { fieldErrors, formErrors };
      })
      .finally(() => set({ isUserTracksLoading: false }));
  },

  // getTracksByUser: async (userId: string, page: string) => {
  //   set({ isUserTracksLoading: true });
  //
  //   return new Promise((res, _rej) => {
  //     setTimeout(() => {
  //       const tracks: Track[] = [];
  //
  //       for (let i = 0; i < 30; i++) {
  //         tracks.push({
  //           id: String(Math.random()),
  //           userIdTracks: 'http://localhost:8080',
  //           userIdSearchHistory: 'http://localhost:8080',
  //           title: 'http://localhost:8080',
  //           urlId: 'http://localhost:8080',
  //           duration: 'http://localhost:8080',
  //           createdAt: new Date(),
  //           updatedAt: new Date(),
  //           url: 'http://localhost:8080',
  //           imgUrl: 'http://localhost:8080',
  //           author: 'http://localhost:8080',
  //           source: 'http://localhost:8080',
  //         });
  //       }
  //       set((state) => ({ userTracks: [...state.userTracks, ...tracks] }));
  //       set({ isUserTracksLoading: false });
  //       res(tracks);
  //     }, 1000);
  //   });
  // },

  registerSpotify: () => {
    return window.open(
      `${import.meta.env.VITE_API_BASE_URL}/auth/spotify`,
      '_self',
    );
  },
  removeSpotify: async (userId: string) => {
    return httpClient
      .patch<NormalizedUser>('/users/remove-app', {
        provider: 'Spotify',
        userId,
      })
      .then(({ data: user }) => {
        set({ user });

        return user;
      })
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;

        throw { fieldErrors, formErrors };
      });
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
  reset: async (email: string) => {
    return await authClient
      .post<NormalizedUser>('/reset', {
        email,
      })
      .then(({ data: user }) => user)
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;

        throw { fieldErrors, formErrors };
      });
  },
  resetVerify: async (resetToken: string | null) => {
    return await authClient
      .get<NormalizedUser>(`/reset/${resetToken}`)
      .then(({ data: user }) => user)
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;

        throw { fieldErrors, formErrors };
      });
  },
  resetActivate: async (
    resetToken: string | null,
    newPassword: string,
    confirmationPassword: string,
  ) => {
    return await authClient
      .patch<NormalizedUser>(`/reset/${resetToken}`, {
        newPassword,
        confirmationPassword,
      })
      .then(({ data: user }) => user)
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;

        throw { fieldErrors, formErrors };
      });
  },
  deleteUser: async (email: string | null) => {
    return await authClient.delete(`/delete/${email}`).catch((serverErrors) => {
      const { fieldErrors, formErrors }: ServerErrors =
        serverErrors.response.data;

      throw { fieldErrors, formErrors };
    });
  },
  resendCode: async (email: string | null) => {
    return await authClient
      .get(`/resend/${email}`)
      .then((activationToken) => activationToken)
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;

        throw { fieldErrors, formErrors };
      });
  },
  deleteResetToken: async (email: string | null) => {
    return await authClient.patch(`/delete/${email}`).catch((serverErrors) => {
      const { fieldErrors, formErrors }: ServerErrors =
        serverErrors.response.data;

      throw { fieldErrors, formErrors };
    });
  },
  resendResetToken: async (email: string | null) => {
    return await authClient
      .get(`/resend/${email}/resetToken`)
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;

        throw { fieldErrors, formErrors };
      });
  },
});

export { type UserState };
