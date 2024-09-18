/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable indent */
import React, { memo, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { useStore } from '@/store';
import { Menu } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';

import ReactPlayer from '@/lib/ReactPlayer';

import format from '@/shared/helpers/format';
import { useDebounce } from '@/shared/hooks/useDebounce';

import { createPlayerSlice } from '@/modules/Player/store';
import { modalButtons } from '@/modules/TrackModal';
import { TrackModal } from '@/modules/TrackModal';
import useHandlerModal from '@/modules/TrackModal/hooks/useHandlerModal';

import Portal from '@/components/Portal/Portal';
import { TrackInfo } from '@/components/TrackInfo';

import TextButton from '@/ui/Button/TextButtonWithIcon/TextButtonWithIcon';
import { Container } from '@/ui/Container';
import { SearchInput } from '@/ui/Input';
import { Logo } from '@/ui/Logo';
import { NotificationMessage } from '@/ui/NotificationMessage';
import { Spinner } from '@/ui/Spinner';

const { ShareButton, FavoriteButton, SaveOnMainButton } = modalButtons;

const TrackAddition: React.FC = memo(() => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'trackAdditionPage',
  });

  const [isTrackFavourite, setIsTrackFavourite] = useState(false);
  const [isTrackSaved, setIsTrackSaved] = useState(false);

  const {
    user,
    parsedTrack,
    parseTrack,
    clearParsedTrack,
    isParsedTrackLoading,
    setIsParsedTrackLoading,
    parsedTrackDuration,
    setParsedTrackDuration,
    checkFavouriteTrack,
    resolvedUrl,
    resolveShortUrl,
    setResolvedUrl,
    setParsedTrack,
    checkSavedTrack,
  } = useStore(
    ({
      user,
      parsedTrack,
      parseTrack,
      clearParsedTrack,
      isParsedTrackLoading,
      setIsParsedTrackLoading,
      parsedTrackDuration,
      setParsedTrackDuration,
      checkFavouriteTrack,
      resolvedUrl,
      resolveShortUrl,
      setResolvedUrl,
      setParsedTrack,
      checkSavedTrack,
    }) => ({
      user,
      parsedTrack,
      parseTrack,
      clearParsedTrack,
      isParsedTrackLoading,
      setIsParsedTrackLoading,
      parsedTrackDuration,
      setParsedTrackDuration,
      checkFavouriteTrack,
      resolvedUrl,
      resolveShortUrl,
      setResolvedUrl,
      setParsedTrack,
      checkSavedTrack,
    }),
  );

  const { playerState, currentTrack, changeCurrentTrack, changePlayerState } =
    createPlayerSlice();

  const {
    watch,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      url: '',
    },
  });

  const {
    modalOnBlurHandler,
    handlerTrackModal,
    modalOnCloseHandler,
    showModal,
    childElement,
  } = useHandlerModal(parsedTrack);

  const newTrackRef = useRef<ReactPlayer>(null);
  const debounceValue = useDebounce(watch('url'), 500);

  const handlerProtectedModal = async (
    e: React.MouseEvent<HTMLDivElement> & { trackId?: string },
  ) => {
    await checkSavedTrack(parsedTrack!.id, user!.id)
      .then(() => setIsTrackSaved(true))
      .catch(() => setIsTrackSaved(false));

    checkFavouriteTrack(parsedTrack!.id, user!.id)
      .then(() => setIsTrackFavourite(true))
      .catch(() => setIsTrackFavourite(false))
      .finally(() => handlerTrackModal!(e));
  };

  useEffect(() => {
    clearParsedTrack();

    return () => {
      setResolvedUrl(null);
      clearParsedTrack();
    };
  }, []);

  useEffect(() => {
    if (!debounceValue) return;

    switch (true) {
      case debounceValue.includes('spotify'): {
        if (debounceValue.split(':').length === 3) {
          setResolvedUrl(debounceValue);
          break;
        }

        const urlId = debounceValue.match(
          /(?:spotify\.com\/track\/)([a-zA-Z0-9]+)/,
        )?.[1];

        setResolvedUrl(`spotify:track:${urlId}`);
        break;
      }

      case debounceValue.includes('on.soundcloud'): {
        resolveShortUrl(debounceValue);
        break;
      }

      default: {
        setResolvedUrl(debounceValue);
      }
    }
  }, [debounceValue]);

  const clearValueHandler = () => {
    setValue('url', '');
    clearErrors('url');
    setParsedTrack(null);
  };

  const getClipboardText = async () => {
    navigator.permissions
      .query({ name: 'clipboard-read' as PermissionName })
      .then(async () => {
        const clipText = await navigator.clipboard.readText();
        setValue('url', clipText);
      })
      .catch(() => {
        toast.custom(() => (
          <NotificationMessage message={t('clipBoardError')} />
        ));
      });
  };

  return (
    <div
      className="
        pt-6
        lg:pt-12
      "
    >
      <Container>
        <header className="mb-8 lg:hidden">
          <Logo textSize="text-lg" logoWidth="w-6" />
        </header>

        <h2
          className="
            mb-6
          text-[white]
            font-rubik
            font-semibold
            text-[22px]
            tracking-wider
            lg:mb-0
            lg:font-openSans
            lg:text-[28px]
            lg:font-normal
          "
        >
          {t('title')}
        </h2>
        <p className="text-secondary-cadet-gray lg:hidden">
          {t('pasteLinkAnnotation')}
        </p>
        <Controller
          name="url"
          control={control}
          render={({ field: { value, onChange } }) => (
            <SearchInput
              placeholder={t('inputPlaceholder')}
              clearValue={clearValueHandler}
              error={errors.url?.message}
              className=" mb-4 max-w-sm lg:mb-7"
              onChange={(event) => {
                clearErrors('url');
                onChange(event.target.value);

                if (!event.target.value.length) {
                  clearParsedTrack();
                  setIsParsedTrackLoading(false);
                  changePlayerState(false);
                }
              }}
              value={value}
            />
          )}
        />
        <TextButton
          title={t('pasteLinkCTA')}
          handler={getClipboardText}
          className=" text-sm focus:text-secondary-satin-sheen-gold !w-fit mb-8 lg:mb-12"
        />
        {!parsedTrack && !isParsedTrackLoading && (
          <p className=" text-secondary-cadet-gray mb-8 lg:mb-12">
            {t('pasteLinkAnnotationDesktop')}
          </p>
        )}
      </Container>
      <AnimatePresence>
        {isParsedTrackLoading && (
          <motion.div
            className="flex justify-center"
            initial={{ display: 'none' }}
            animate={{ display: 'flex' }}
            exit={{ display: 'none' }}
            transition={{ duration: 0.2 }}
          >
            <Spinner className="relative" />
          </motion.div>
        )}
      </AnimatePresence>

      {parsedTrack && !isParsedTrackLoading && (
        <>
          <div className="xl:hidden">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, display: 'none' }}
                transition={{ duration: 0.2 }}
              >
                <TrackInfo
                  id={parsedTrack.id}
                  artist={parsedTrack.author as string}
                  name={parsedTrack.title}
                  provider={parsedTrack.source}
                  duration={parsedTrackDuration || parsedTrack.duration}
                  imgUrl={parsedTrack.imgUrl as string}
                  isPlay={parsedTrack.url === currentTrack?.url}
                  isFavourite={parsedTrack.isFavourite}
                  handlerPlay={() => {
                    changeCurrentTrack(parsedTrack);
                    changePlayerState(!playerState);
                  }}
                  handlerModal={handlerProtectedModal!}
                  modalOnBlurHandler={modalOnBlurHandler}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="hidden xl:block">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: -10, display: 'none' }}
                animate={{ opacity: 1, y: 0, display: 'block' }}
                exit={{ opacity: 0, y: -10, display: 'none' }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <TrackInfo
                  isDesktop={true}
                  id={parsedTrack.id}
                  artist={parsedTrack.author as string}
                  name={parsedTrack.title}
                  provider={parsedTrack.source}
                  duration={parsedTrackDuration || parsedTrack.duration}
                  imgUrl={parsedTrack.imgUrl as string}
                  isPlay={parsedTrack.url === currentTrack?.url}
                  isFavourite={parsedTrack.isFavourite}
                  handlerPlay={() => {
                    changeCurrentTrack(parsedTrack);
                    changePlayerState(!playerState);
                  }}
                  handlerModal={handlerProtectedModal!}
                  modalOnBlurHandler={modalOnBlurHandler}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      )}

      <ReactPlayer
        url={resolvedUrl as string}
        onReady={() => {
          const duration = format(newTrackRef.current?.getDuration() as number);

          if (duration === '0:00') {
            setParsedTrackDuration(null);
          } else {
            setParsedTrackDuration(duration);
          }

          parseTrack(resolvedUrl as string, user?.id as string, duration)
            .then((track) => setParsedTrackDuration(track.duration))
            .catch(({ formErrors }) => {
              setError('url', {
                message: formErrors,
              });
            });
        }}
        ref={newTrackRef}
        onError={() =>
          setError('url', {
            message: t('inputError'),
          })
        }
        style={{
          position: 'fixed',
          zIndex: -10,
        }}
      />

      <Menu>
        <Portal openPortal={showModal} element={childElement}>
          <TrackModal
            showModal={showModal}
            modalOnCloseHandler={modalOnCloseHandler}
            actionButtons={
              <>
                <Menu.Item
                  as={FavoriteButton}
                  selectedTrack={parsedTrack!}
                  trackIsFavourite={isTrackFavourite}
                  setGlobalTrackIsFavourite={setIsTrackFavourite}
                  closeModal={modalOnCloseHandler!}
                  className="first:rounded-t-xl first:hover:rounded-t-xl last:border-b-0 last:hover:rounded-b-xl "
                />

                <Menu.Item
                  as={SaveOnMainButton}
                  selectedTrack={parsedTrack!}
                  trackIsSaved={isTrackSaved}
                  setGlobalTrackIsSaved={setIsTrackSaved}
                  closeModal={modalOnCloseHandler!}
                  className="first:rounded-t-xl first:hover:rounded-t-xl last:border-b-0 last:hover:rounded-b-xl "
                />

                <Menu.Item
                  as={ShareButton}
                  selectedTrack={parsedTrack!}
                  className="first:rounded-t-xl first:hover:rounded-t-xl last:border-b-0 last:hover:rounded-b-xl"
                />
              </>
            }
            trackAuthor={parsedTrack && parsedTrack.author}
            trackImgUrl={parsedTrack && parsedTrack.imgUrl}
            trackTitle={parsedTrack && parsedTrack.title}
            trackSource={parsedTrack && parsedTrack.source}
          />
        </Portal>
      </Menu>
    </div>
  );
});

export default TrackAddition;
