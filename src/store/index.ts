import { create } from 'zustand';

import {
  type UserState,
  createUserSlice,
} from '@/modules/Authorization/store';

import {
  type PlayerState,
  createPlayerSlice,
} from '@/modules/Player/store';

export const useStore = create<UserState & PlayerState>((...a) => ({
  ...createUserSlice(...a),
  ...createPlayerSlice(...a),
}));
