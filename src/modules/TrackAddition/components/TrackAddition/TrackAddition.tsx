import React, { memo, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ReactPlayer from 'react-player';

import { useStore } from '@/store';

import format from '@/shared/helpers/format';
import { useDebounce } from '@/shared/hooks/useDebounce';

import { TrackInfo } from '@/components/TrackInfo/TrackInfo';

import { DefaultInput } from '@/ui/Input';

import Logo from '../../ui/logo.svg';

const TrackAddition: React.FC = memo(() => {
  const [duration, setDuration] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, parsedTrack, parseTrack, clearParsedTrack } = useStore(
    ({ user, parsedTrack, parseTrack, clearParsedTrack }) => ({
      user,
      parsedTrack,
      parseTrack,
      clearParsedTrack,
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

  useEffect(() => {
    if (debounceValue && user) {
      setIsLoading(true);
      parseTrack(debounceValue, user.id).catch(({ formErrors }) => {
        setError('url', {
          message: formErrors,
        });
      });
    }
  }, [debounceValue]);

  return (
    <div
      className="
            flex
            flex-col
            h-full
            w-full
            p-4
            pt-6
            lg:p-0
            lg:pt-12
            lg:px-20 
            "
    >
      <header className="mb-8 lg:hidden">
        <span>
          <img src={Logo} alt="logo" />
        </span>
      </header>

      <h2
        className="mb-6 text-[white] font-rubik font-semibold text-[22px] tracking-wider 
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
            onChange={onChange}
            value={value}
          />
        )}
      />
      {parsedTrack && !isLoading ? (
        <TrackInfo artist="" name="" provider="" duration={duration} />
      ) : (
        <div className="text-secondary-cadet-gray font-rubik font-normal text-base leading-6 tracking-wider ">
          Вставьте ссылку на трек из стримингового сервиса и добавьте его в свою
          библиотеку!
        </div>
      )}
      <ReactPlayer
        url={parsedTrack?.url}
        onReady={() => {
          if (newTrackRef.current?.getDuration()) {
            const duration = format(newTrackRef.current?.getDuration());
            setDuration(duration);
            setIsLoading(false);
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
