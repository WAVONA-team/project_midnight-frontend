import { type AxiosResponse } from 'axios';
import { Track } from 'project_midnight';
import { NormalizedUser, UserWithAccessToken } from 'project_midnight/types';

export type UserState = {
  user: NormalizedUser | null;
  isChecked: boolean;
  register: (email: string, password: string) => Promise<NormalizedUser>;
  getTracksByUser: (userId: string, page: string) => Promise<Track[]>;
  registerVerify: (
    activationToken: string | null,
  ) => Promise<UserWithAccessToken>;
  removeSpotify: (userId: string) => Promise<NormalizedUser>;
  registerSpotify: () => Window | null;
  login: (email: string, password: string) => Promise<UserWithAccessToken>;
  logout: () => Promise<AxiosResponse>;
  checkAuth: () => Promise<UserWithAccessToken | void>;
  reset: (email: string) => Promise<NormalizedUser>;
  resetVerify: (resetToken: string | null) => Promise<NormalizedUser>;
  resetActivate: (
    resetToken: string | null,
    newPassword: string,
    confirmationPassword: string,
  ) => Promise<NormalizedUser>;
  deleteUser: (email: string | null) => Promise<AxiosResponse>;
  resendCode: (email: string | null) => Promise<AxiosResponse>;
  deleteResetToken: (email: string | null) => Promise<AxiosResponse>;
  resendResetToken: (email: string | null) => Promise<AxiosResponse>;
};
