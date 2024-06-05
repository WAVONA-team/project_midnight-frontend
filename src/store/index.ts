import { create } from 'zustand';

import {
  type TracksPageState,
  tracksPageSlice,
} from '@/pages/TracksPage/store';

import { type UserState, createUserSlice } from '@/modules/Authorization/store';
import { type PlayerState, createPlayerSlice } from '@/modules/Player/store';
import { trackActionsSlice } from '@/modules/TrackActions';
import { TrackActionsState } from '@/modules/TrackActions/store/types.ts';
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
    TracksPageState &
    TrackActionsState
>((...a) => ({
  ...createUserSlice(...a),
  ...createPlayerSlice(...a),
  ...parseTrackSlice(...a),
  ...userSearchHistorySlice(...a),
  ...tracksPageSlice(...a),
  ...trackActionsSlice(...a),
}));
