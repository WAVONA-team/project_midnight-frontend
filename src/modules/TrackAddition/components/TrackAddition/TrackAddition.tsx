import React, { memo, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ReactPlayer from 'react-player';

import { useStore } from '@/store';

import format from '@/shared/helpers/format';
import { useDebounce } from '@/shared/hooks/useDebounce';

import { TrackInfo } from '@/components/TrackInfo/TrackInfo';

import { Container } from '@/ui/Container';
import { DefaultInput } from '@/ui/Input';
import { Spinner } from '@/ui/Spinner';

import Logo from '../../ui/logo.svg';

const TrackAddition: React.FC = memo(() => {
  const [duration, setDuration] = useState('');
  const {
    user,
    parsedTrack,
    parseTrack,
    clearParsedTrack,
    isParsedTrackLoading,
    setIsParsedTrackLoading,
    playerState,
    changePlayerState,
    trackNumber,
    setTracks,
    changeTrackNumber,
  } = useStore(
    ({
      user,
      parsedTrack,
      parseTrack,
      clearParsedTrack,
      isParsedTrackLoading,
      setIsParsedTrackLoading,
      playerState,
      changePlayerState,
      trackNumber,
      setTracks,
      changeTrackNumber,
    }) => ({
      user,
      parsedTrack,
      parseTrack,
      clearParsedTrack,
      isParsedTrackLoading,
      setIsParsedTrackLoading,
      playerState,
      changePlayerState,
      trackNumber,
      setTracks,
      changeTrackNumber,
    }),
  );
  const {
    watch,
    control,
    setError,
    formState: { errors },
    setValue,
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

  useEffect(() => {
    if (debounceValue.length > 0) {
      parseTrack(debounceValue, user?.id as string).catch(({ formErrors }) => {
        setError('url', {
          message: formErrors,
        });
      });
    }
  }, [debounceValue]);

  useEffect(() => {
    if (parsedTrack?.url) {
      setValue('url', parsedTrack.url);
    }
  }, [parseTrack, parsedTrack?.url, setValue]);

  return (
    <div
      className="
        pt-6
        lg:pt-12
      "
    >
      <Container>
        <header className="mb-8 lg:hidden">
          <span>
            <img src={Logo} alt="logo" />
          </span>
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
                  changePlayerState(false);
                }
              }}
              value={value}
            />
          )}
        />
      </Container>

      {isParsedTrackLoading && <Spinner />}

      {parsedTrack && !isParsedTrackLoading && (
        <TrackInfo
          artist={parsedTrack.author}
          name={parsedTrack.title}
          provider={parsedTrack.source}
          duration={duration}
          imgUrl={parsedTrack.imgUrl as string}
          trackIndexPlay={0}
          trackIndex={trackNumber}
          isPlay={playerState}
          handlerPlay={() => {
            setTracks([parsedTrack.url]);
            changeTrackNumber(0);
            changePlayerState(true);
          }}
          handlerModal={() => {}}
        />
      )}

      <ReactPlayer
        url={parsedTrack?.url}
        onReady={() => {
          if (newTrackRef.current) {
            const duration = format(newTrackRef.current?.getDuration());
            setDuration(duration);

            setIsParsedTrackLoading(false);
          }
        }}
        ref={newTrackRef}
        width="0"
        height="0"
      />
    </div>
  );
});

export default TrackAddition;
