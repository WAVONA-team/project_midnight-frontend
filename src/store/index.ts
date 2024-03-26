import { create } from 'zustand';

import { type UserState, createUserSlice } from '@/modules/Authorization/store';
import { type PlayerState, createPlayerSlice } from '@/modules/Player/store';
import {
  type TrackAdditionState,
  createTrackSlice,
} from '@/modules/TrackAddition/store';

export const useStore = create<UserState & PlayerState & TrackAdditionState>(
  (...a) => ({
    ...createUserSlice(...a),
    ...createPlayerSlice(...a),
    ...createTrackSlice(...a),
  }),
);
