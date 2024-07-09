import React, { useCallback } from 'react';

import { useStore } from '@/store';
import debounce from 'lodash.debounce';

import { tracksSearchPageSlice } from '@/pages/TrackSearchPage/store';
import TracksPageHeaderMobile from '@/pages/TracksPage/modules/TracksPageHeaderMobile/TracksPageHeaderMobile.tsx';

import ToggleButton from '@/ui/Button/ToggleButton/ToggleButton.tsx';
import { Container } from '@/ui/Container';
import { SearchInput } from '@/ui/Input';

const TrackPageHeader: React.FC = React.memo(() => {
  const {
    user,
    getTracksByUser,
    currentPage,
    setTracks,
    clearUserTracks,
    isFavouriteTracksLoading,
    setIsFavouriteTracksLoading,
    setIsQueryTracksLoading,
  } = useStore(
    ({
      user,
      getTracksByUser,
      currentPage,
      setTracks,
      clearUserTracks,
      isFavouriteTracksLoading,
      setIsFavouriteTracksLoading,
      setIsQueryTracksLoading,
    }) => ({
      user,
      getTracksByUser,
      currentPage,
      setTracks,
      clearUserTracks,
      isFavouriteTracksLoading,
      setIsFavouriteTracksLoading,
      setIsQueryTracksLoading,
    }),
  );

  const { query, setQuery } = tracksSearchPageSlice(({ query, setQuery }) => ({
    query,
    setQuery,
  }));

  const getTracksByUserWrapper = useCallback((query: string) => {
    clearUserTracks();

    getTracksByUser(user!.id, currentPage, { query }).then((tracks) =>
      setTracks(tracks),
    );
  }, []);

  const debouncedGet = useCallback(debounce(getTracksByUserWrapper, 500), [
    getTracksByUserWrapper,
  ]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearUserTracks();
    setIsQueryTracksLoading(true);
    setQuery(e.target.value);
    debouncedGet(e.target.value);
  };

  const clearValueHandler = () => {
    setQuery('');
    clearUserTracks();

    getTracksByUser(user!.id, currentPage).then((tracks) => setTracks(tracks));
  };

  return (
    <Container className="mb-8 md:mb-12">
      <div className="lg:hidden">
        <TracksPageHeaderMobile />
      </div>

      <div className="flex justify-between flex-col pt-8 sm:flex-row">
        <div className="w-full overflow-hidden hidden lg:block">
          <SearchInput
            className={'lg:max-w-[398px] mr-3 col-span-3'}
            clearValue={clearValueHandler}
            placeholder="Название, исполнитель..."
            value={query}
            onChange={onChangeHandler}
          />
        </div>

        <div className="flex justify-center sm:self-end">
          <ToggleButton
            leftTitle="Все треки"
            rightTitle="Избранные"
            isFavouriteTracksLoading={isFavouriteTracksLoading}
            setIsFavouriteTracksLoading={setIsFavouriteTracksLoading}
          />
        </div>
      </div>
    </Container>
  );
});

export default TrackPageHeader;
