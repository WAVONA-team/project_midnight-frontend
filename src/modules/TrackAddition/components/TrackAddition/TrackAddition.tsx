import React, { memo, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useStore } from '@/store';
import { Menu } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';

import ReactPlayer from '@/lib/ReactPlayer';

import format from '@/shared/helpers/format';
import { useDebounce } from '@/shared/hooks/useDebounce';

import { getUrl } from '@/modules/TrackAddition/helpers';
import { modalButtons } from '@/modules/TrackModal';
import { TrackModal } from '@/modules/TrackModal';
import useHandlerModal from '@/modules/TrackModal/hooks/useHandlerModal';

import Portal from '@/components/Portal/Portal';
import { TrackInfo } from '@/components/TrackInfo';

import { Container } from '@/ui/Container';
import { DefaultInput } from '@/ui/Input';
import { Logo } from '@/ui/Logo';
import { Spinner } from '@/ui/Spinner';

const { ShareButton } = modalButtons;

const TrackAddition: React.FC = memo(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isTrackSave, setIsTrackSave] = useState(false);

  const {
    user,
    parsedTrack,
    currentTrack,
    parseTrack,
    clearParsedTrack,
    isParsedTrackLoading,
    setIsParsedTrackLoading,
    playerState,
    changePlayerState,
    changeCurrentTrack,
    parsedTrackDuration,
    setParsedTrackDuration,
    checkTrack,
  } = useStore(
    ({
      user,
      parsedTrack,
      currentTrack,
      parseTrack,
      clearParsedTrack,
      isParsedTrackLoading,
      setIsParsedTrackLoading,
      playerState,
      changePlayerState,
      changeCurrentTrack,
      parsedTrackDuration,
      setParsedTrackDuration,
      checkTrack,
    }) => ({
      user,
      parsedTrack,
      currentTrack,
      parseTrack,
      clearParsedTrack,
      isParsedTrackLoading,
      setIsParsedTrackLoading,
      playerState,
      changePlayerState,
      changeCurrentTrack,
      parsedTrackDuration,
      setParsedTrackDuration,
      checkTrack,
    }),
  );

  const {
    watch,
    control,
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
      checkTrack(parsedTrack?.id, user?.id)
        .then(() => {
          setIsTrackSave(false);
        })
        .catch(() => setIsTrackSave(true))
        .finally(() => {
          handlerTrackModal!(e);
        });
    }
  };

  useEffect(() => {
    clearParsedTrack();
  }, []);

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

        <Controller
          name="url"
          control={control}
          render={({ field: { value, onChange } }) => (
            <DefaultInput
              labelText="Вставьте ссылку на трек"
              withoutLabel={true}
              placeholder="Ссылка на трек"
              error={errors.url?.message}
              className="mb-8 max-w-sm lg:mb-12"
              onChange={(event) => {
                onChange(event.target.value);
                clearErrors('url');

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
                  artist={parsedTrack.author as string}
                  name={parsedTrack.title}
                  provider={parsedTrack.source}
                  duration={parsedTrackDuration || parsedTrack.duration}
                  imgUrl={parsedTrack.imgUrl as string}
                  isPlay={parsedTrack.url === currentTrack?.url}
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
                  artist={parsedTrack.author as string}
                  name={parsedTrack.title}
                  provider={parsedTrack.source}
                  duration={parsedTrackDuration || parsedTrack.duration}
                  imgUrl={parsedTrack.imgUrl as string}
                  isPlay={parsedTrack.url === currentTrack?.url}
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

      <AnimatePresence>
        <ReactPlayer
          url={getUrl(debounceValue)}
          onReady={() => {
            const duration = format(
              newTrackRef.current?.getDuration() as number,
            );

            if (duration === '0:00') {
              setParsedTrackDuration(null);
            } else {
              setParsedTrackDuration(duration);
            }

            parseTrack(debounceValue, user?.id as string, duration)
              .then((track) => setParsedTrackDuration(track.duration))
              .catch(({ formErrors }) => {
                setError('url', {
                  message: formErrors,
                });
              });

            setIsParsedTrackLoading(true);
          }}
          ref={newTrackRef}
          onError={() =>
            setError('url', {
              message: 'Некорректный формат. Попробуйте снова',
            })
          }
          width="0"
          height="0"
          style={{
            display: 'none',
            transition: 'all',
            transitionDuration: '0.2s',
          }}
        />
      </AnimatePresence>

      <Portal openPortal={showModal} element={childElement}>
        <TrackModal
          showModal={showModal}
          modalOnCloseHandler={modalOnCloseHandler}
          actionButtons={
            <>
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
    </div>
  );
});

export default TrackAddition;
