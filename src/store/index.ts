import { create } from 'zustand';

import {
  type PlaylistsPageState,
  createPlaylistSlice,
} from '@/pages/PlaylistsPage/store';

import {
  TracksPlaylistControlsState,
  tracksPlaylistControls,
} from '@/pages/TracksPage/modules/TrackPageControls/store';
import {
  type TracksPageState,
  tracksPageSlice,
} from '@/pages/TracksPage/store';

import { type UserState, createUserSlice } from '@/modules/Authorization/store';
import {
  type TrackActionsState,
  trackActionsSlice,
} from '@/modules/TrackActions/store';
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
    TracksPageState &
    TrackActionsState &
    TracksPlaylistControlsState &
    PlaylistsPageState
>((...a) => ({
  ...createUserSlice(...a),
  ...parseTrackSlice(...a),
  ...userSearchHistorySlice(...a),
  ...tracksPageSlice(...a),
  ...tracksPageSlice(...a),
  ...trackActionsSlice(...a),
  ...tracksPlaylistControls(...a),
  ...createPlaylistSlice(...a),
}));
