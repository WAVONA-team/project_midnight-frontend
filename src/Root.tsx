import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import {
  ConfirmationRegisterPage,
  ConfirmationResetPasswordPage,
  ConnectedAppsSettings,
  HomePage,
  LoginPage,
  PlaylistPage,
  PlaylistsPage,
  CreateNewPlaylistPage,
  RegistrationPage,
  RequireAuthPage,
  ResetPasswordPage,
  SettingsPage,
  TestPage,
  TracksPage,
  TrackPage,
  CreateNewTrackPage,
  TrackQueuePage,
  UpdateResetPasswordPage
} from '@/pages';

import App from './App';

export const Root: React.FC = React.memo(() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="register" element={<RegistrationPage />} />

          <Route path="verify" element={<ConfirmationRegisterPage />} />

          <Route path="login" element={<LoginPage />} />

          <Route path="reset" element={<ResetPasswordPage />} />

          <Route
            path="reset-verify"
            element={<ConfirmationResetPasswordPage />}
          />

          <Route path="reset-update" element={<UpdateResetPasswordPage />} />

          <Route path="/" element={<RequireAuthPage />}>
            <Route index element={<HomePage />} />

            <Route path="home" element={<Navigate to="/" replace />} />

            <Route path="playlists">
              <Route index element={<PlaylistsPage />} />
              <Route path="new" element={<CreateNewPlaylistPage />} />
              <Route path=":playlistId" element={<PlaylistPage />} />
            </Route>

            <Route path="tracks">
              <Route index element={<TracksPage />} />
              <Route path="queue" element={<TrackQueuePage />} />
              <Route path="new" element={<CreateNewTrackPage />} />
              <Route path=":trackId" element={<TrackPage />} />
            </Route>

            <Route path="settings">
              <Route index element={<SettingsPage />} />
              <Route path="connected-apps" element={<ConnectedAppsSettings />} />
            </Route>

            <Route path="test" element={<TestPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
});
