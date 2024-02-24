import { create } from 'zustand';

import { type UserState, createUserSlice } from './user/userSlice';

export const useStore = create<UserState>((...a) => ({
  ...createUserSlice(...a),
}));
