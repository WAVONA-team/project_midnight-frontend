/* eslint-disable indent */
import React, { memo, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useStore } from '@/store';
import { Menu } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';

import ReactPlayer from '@/lib/ReactPlayer';

import format from '@/shared/helpers/format';
import { useDebounce } from '@/shared/hooks/useDebounce';

import { createPlayerSlice } from '@/modules/Player/store';
import { modalButtons } from '@/modules/TrackModal';
import { TrackModal } from '@/modules/TrackModal';
import { DeleteButton } from '@/modules/TrackModal/components/buttons';
import TrackFavoriteButton from '@/modules/TrackModal/components/buttons/TrackFavoriteButton/TrackFavoriteButton';
import useHandlerModal from '@/modules/TrackModal/hooks/useHandlerModal';

import Portal from '@/components/Portal/Portal';
import { TrackInfo } from '@/components/TrackInfo';

import TextButton from '@/ui/Button/TextButtonWithIcon/TextButtonWithIcon';
import { Container } from '@/ui/Container';
import { SearchInput } from '@/ui/Input';
import { Logo } from '@/ui/Logo';
import { NotificationMessage } from '@/ui/NotificationMessage';
import { Spinner } from '@/ui/Spinner';

const { ShareButton, FavoriteButton } = modalButtons;

const TrackAddition: React.FC = memo(() => {
  const [isTrackSave, setIsTrackSave] = useState(false);

  const {
    user,
    parsedTrack,
    parseTrack,
    clearParsedTrack,
    isParsedTrackLoading,
    setIsParsedTrackLoading,
    parsedTrackDuration,
    setParsedTrackDuration,
    checkTrack,
    resolvedUrl,
    resolveShortUrl,
    setResolvedUrl,
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
      checkTrack,
      resolvedUrl,
      resolveShortUrl,
      setResolvedUrl,
    }) => ({
      user,
      parsedTrack,
      parseTrack,
      clearParsedTrack,
      isParsedTrackLoading,
      setIsParsedTrackLoading,
      parsedTrackDuration,
      setParsedTrackDuration,
      checkTrack,
      resolvedUrl,
      resolveShortUrl,
      setResolvedUrl,
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
    if (user && parsedTrack) {
      try {
        await checkTrack(parsedTrack?.id, user?.id);
        setIsTrackSave(true);
      } catch {
        setIsTrackSave(false);
      } finally {
        handlerTrackModal!(e);
      }
    }
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
          <NotificationMessage message={`Ошибка чтения буфера обмена`} />
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
          Добавление трека
        </h2>
        <p className="text-secondary-cadet-gray lg:hidden">
          Вставьте ссылку на трек
        </p>
        <Controller
          name="url"
          control={control}
          render={({ field: { value, onChange } }) => (
            <SearchInput
              placeholder="Ссылка на трек"
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
          title="Вставить из буфера обмена"
          handler={getClipboardText}
          className=" text-sm focus:text-secondary-satin-sheen-gold !w-fit mb-8 lg:mb-12"
        />
        {!parsedTrack && !isParsedTrackLoading && (
          <p className=" text-secondary-cadet-gray mb-8 lg:mb-12">
            Вставьте ссылку на трек из стримингового сервиса и добавьте его в
            свою библиотеку!
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
            message: 'Некорректный формат. Попробуйте снова',
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
                  closeModal={modalOnCloseHandler!}
                  className="first:rounded-t-xl first:hover:rounded-t-xl last:border-b-0 last:hover:rounded-b-xl "
                />

                <Menu.Item
                  as={ShareButton}
                  selectedTrack={parsedTrack!}
                  className="first:rounded-t-xl first:hover:rounded-t-xl last:border-b-0 last:hover:rounded-b-xl"
                />
                <Menu.Item
                  as={TrackFavoriteButton}
                  selectedTrack={parsedTrack!}
                  className="first:rounded-t-xl first:hover:rounded-t-xl last:border-b-0 last:hover:rounded-b-xl "
                />
                {isTrackSave && (
                  <Menu.Item
                    as={DeleteButton}
                    selectedTrack={parsedTrack!}
                    className="first:rounded-t-xl first:hover:rounded-t-xl last:border-b-0 last:hover:rounded-b-xl "
                  />
                )}
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
