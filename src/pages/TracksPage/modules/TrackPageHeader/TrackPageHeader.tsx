import React, { useCallback } from 'react';

import { useStore } from '@/store';
import debounce from 'lodash.debounce';

import TracksPageHeaderMobile from '@/pages/TracksPage/modules/TracksPageHeaderMobile/TracksPageHeaderMobile.tsx';

import { Container } from '@/ui/Container';
import { SearchInput } from '@/ui/Input';

const TrackPageHeader: React.FC = React.memo(() => {
  const {
    user,
    getTracksByUser,
    currentPage,
    setTracks,
    clearUserTracks,

    query,
    setQuery,
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
      query,
      setQuery,
      setIsQueryTracksLoading,
      favouriteTracksIcon,
      allTracksIcon,
      tracks,
      changeCurrentTrack,
      changePlayerState,
      currentTrack,
      playerState,
    }) => ({
      user,
      getTracksByUser,
      currentPage,
      setTracks,
      clearUserTracks,
      isFavouriteTracksLoading,
      setIsFavouriteTracksLoading,
      query,
      setQuery,
      setIsQueryTracksLoading,
      favouriteTracksIcon,
      allTracksIcon,
      tracks,
      changeCurrentTrack,
      changePlayerState,
      currentTrack,
      playerState,
    }),
  );

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
      </div>
    </Container>
  );
});

export default TrackPageHeader;
