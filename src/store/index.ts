import { create } from 'zustand';

import {
  type TracksSearchPageState,
  tracksSearchPageSlice,
} from '@/pages/TrackSearchPage/store';
import {
  TracksPlaylistControlsState,
  tracksPlaylistControls,
} from '@/pages/TracksPage/modules/TrackPageControls/store';
import {
  type TracksPageState,
  tracksPageSlice,
} from '@/pages/TracksPage/store';

import { type UserState, createUserSlice } from '@/modules/Authorization/store';
import { trackActionsSlice } from '@/modules/TrackActions';
import { TrackActionsState } from '@/modules/TrackActions/store/types';
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
    TrackAdditionState &
    userSearchHistoryState &
    TracksPageState &
    TracksSearchPageState &
    TrackActionsState &
    TracksPlaylistControlsState
>((...a) => ({
  ...createUserSlice(...a),
  ...parseTrackSlice(...a),
  ...userSearchHistorySlice(...a),
  ...tracksPageSlice(...a),
  ...tracksSearchPageSlice(...a),
  ...trackActionsSlice(...a),
  ...tracksPlaylistControls(...a),
}));
