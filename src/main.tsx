import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';

import './index.css';
import ConnectedAppsSettingsPage from './pages/connected-apps-settings-page/connectedAppsSettingsPage.tsx';
import MainPage from './pages/main-page/mainPage.tsx';
import NewTrackPage from './pages/new-track-page/newTrackPage.tsx';
import PlaylistPage from './pages/playlist-page/playlistPage.tsx';
import PlaylistsPage from './pages/playlists-page/playlistsPage.tsx';
import PreloaderPage from './pages/preloader-page/preloaderPage.tsx';
import SettingsPage from './pages/settings-page/settingsPage.tsx';
import TrackPage from './pages/track-page/trackPage.tsx';
import TrackQueuePage from './pages/track-queue-page/trackQueuePage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PreloaderPage />,
  },
  {
    path: '/main',
    element: <MainPage />,
  },
  {
    path: '/new-track/',
    element: <NewTrackPage />,
  },
  {
    path: '/playlists',
    element: <PlaylistsPage />,
  },
  {
    path: '/playlists/:playlistId',
    element: <PlaylistPage />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
  },
  {
    path: '/connected-apps-settings',
    element: <ConnectedAppsSettingsPage />,
  },
  {
    path: '/tracks/:trackId',
    element: <TrackPage />,
  },
  {
    path: '/track-queue/',
    element: <TrackQueuePage />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
);
