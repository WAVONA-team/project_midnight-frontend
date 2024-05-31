import React, { memo, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useStore } from '@/store';
import { AnimatePresence, motion } from 'framer-motion';

import ReactPlayer from '@/lib/ReactPlayer';

import format from '@/shared/helpers/format';
import { useDebounce } from '@/shared/hooks/useDebounce';

import { getUrl } from '@/modules/TrackAddition/helpers';

import { TrackInfo } from '@/components/TrackInfo';

import { Container } from '@/ui/Container';
import { DefaultInput } from '@/ui/Input';
import { Logo } from '@/ui/Logo';
import { Spinner } from '@/ui/Spinner';

const TrackAddition: React.FC = memo(() => {
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
    }),
  );

  const {
    watch,
    control,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      url: '',
    },
  });
  const newTrackRef = useRef<ReactPlayer>(null);
  const debounceValue = useDebounce(watch('url'), 600);

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Spinner
              className="relative"
              backgroundColor="bg-surface-eerie_black"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {parsedTrack && !isParsedTrackLoading && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.2,
              delay: 0.4,
              velocity: 2,
              restSpeed: 1,
            }}
          >
            <motion.div className="xl:hidden">
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
                handlerModal={() => {}}
              />
            </motion.div>

            <motion.div className="hidden xl:block">
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
                handlerModal={() => {}}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ReactPlayer
        url={getUrl(debounceValue)}
        onReady={() => {
          const duration = format(newTrackRef.current?.getDuration() as number);

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
      />
    </div>
  );
});

export default TrackAddition;
