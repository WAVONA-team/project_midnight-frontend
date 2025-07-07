# Midnight – Universal Music Player

## What is Midnight?

**Midnight** is a modern, cross-platform music player that empowers users to aggregate, manage, and enjoy their music collections from multiple popular streaming services—all in one sleek interface. Designed for music enthusiasts who want seamless control and organization, Midnight bridges the gap between disparate music ecosystems, making personal music management effortless and enjoyable.

---

## Key Features

- **Unified Music Library:** Import and manage tracks and playlists from services like Spotify, Apple Music, YouTube Music, and SoundCloud.
- **Personal Playlists & Track Management:** Create, edit, and organize playlists and tracks with intuitive controls.
- **Advanced Search & Filtering:** Quickly find tracks or playlists with powerful search and multi-criteria filtering.
- **Multi-language Support:** Fully localized UI (English, Polish, Russian, Ukrainian) with instant language switching.
- **Responsive, PWA-ready UI:** Enjoy a fast, mobile-friendly experience with offline support and installable app features.
- **Secure Authentication:** Modern registration, login, and password reset flows with protected routes.

---

## Technologies & Architecture

**Frontend Stack:**
- [React 18](https://react.dev/) (with hooks, functional components, and memoization)
- [TypeScript](https://www.typescriptlang.org/) for type safety and maintainability
- [Vite](https://vitejs.dev/) for lightning-fast development and builds
- [Tailwind CSS](https://tailwindcss.com/) for utility-first, responsive design
- [Framer Motion](https://www.framer.com/motion/) for smooth UI animations

**State Management:**
- [Zustand](https://zustand-demo.pmnd.rs/) for modular, scalable global state (user, player, playlists, etc.)

**Internationalization:**
- [i18next](https://www.i18next.com/) with browser language detection and dynamic switching

**Routing & Navigation:**
- [React Router v6](https://reactrouter.com/) for declarative, protected, and nested routes

**API & Data Handling:**
- [Axios](https://axios-http.com/) for robust HTTP requests
- Modular API and store slices for each domain (tracks, playlists, user, etc.)

**Progressive Web App:**
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) for offline support, installability, and custom theming

**UI/UX:**
- Custom component library (`/ui`, `/components`) for reusable, accessible UI elements
- Responsive layouts and dark/light backgrounds
- Toast notifications and modals for user feedback

**Project Structure:**
- `src/pages`: Route-based page components (Home, Tracks, Playlists, Settings, etc.)
- `src/modules`: Feature modules (Player, TrackList, Authorization, etc.)
- `src/store`: Centralized state slices (Zustand)
- `src/ui` & `src/components`: UI primitives and composite components
- `src/i18n`: Localization resources and config
- `src/shared` & `src/lib`: Shared utilities, types, and helpers

---

## Why Midnight?

Midnight stands out by offering a truly unified music experience—no more switching between apps or losing track of your favorite songs. Its robust architecture, modern tech stack, and thoughtful UX make it a strong foundation for further development, team scaling, and rapid feature delivery.

---
