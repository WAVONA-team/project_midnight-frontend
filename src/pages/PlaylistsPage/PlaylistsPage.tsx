import React from 'react';
import { useTranslation } from 'react-i18next';

import { PlaylistContainer } from '@/pages/PlaylistsPage/components/PlaylistContainer/PlaylistContainer';
import { Search } from '@/pages/PlaylistsPage/components/Search/Search';
import { FilterDropdown } from '@/pages/PlaylistsPage/modules/PlaylistFiltration';

import BackButton from '@/ui/Button/BackButton/BackButton';
import { Container } from '@/ui/Container';

export const PlaylistsPage: React.FC = React.memo(() => {
  const { t } = useTranslation('translation', { keyPrefix: 'playlistsPage' });

  return (
    <Container
      className="
        bg-background-hight
        py-6
        sm:bg-background-default-gradient
        sm:py-12
        w-full
        h-full
      "
    >
      <Search />

      <div
        className="
          font-rubik
          text-on-primary-anti-flash-white
          mt-8
          flex
          justify-between
          items-center
        "
      >
        <div className="flex sm:mb-3">
          <BackButton className="sm:hidden" />

          <h1
            className="
            font-normal
            text-base
            tracking-wider
            sm:text-3xl
            sm:leading-10
            sm:font-openSans
          "
          >
            {t('title')}
          </h1>
        </div>

        <FilterDropdown />
      </div>

      <PlaylistContainer />
    </Container>
  );
});
