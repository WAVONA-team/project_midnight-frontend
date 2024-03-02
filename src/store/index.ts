import { create } from 'zustand';

import {
  type UserState,
  createUserSlice,
} from '@/modules/Authorization/store';

export const useStore = create<UserState>((...a) => ({
  ...createUserSlice(...a),
}));
