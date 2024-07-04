import { create } from 'zustand';

import {
  type TracksPageState,
  tracksPageSlice,
} from '@/pages/TracksPage/store';

import { type UserState, createUserSlice } from '@/modules/Authorization/store';
import { type PlayerState, createPlayerSlice } from '@/modules/Player/store';
import {
  type TrackAdditionState,
  parseTrackSlice,
} from '@/modules/TrackAddition/store';
import {
  userSearchHistorySlice,
  type userSearchHistoryState,
} from '@/modules/TrackHistory/store';

export const useStore = create<
  UserState &
    PlayerState &
    TrackAdditionState &
    userSearchHistoryState &
    TracksPageState
>((...a) => ({
  ...createUserSlice(...a),
  ...createPlayerSlice(...a),
  ...parseTrackSlice(...a),
  ...userSearchHistorySlice(...a),
  ...tracksPageSlice(...a),
}));
