import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useStore } from '@/store';

import { ServerErrors } from '@/shared/types/ServerErrors';

import { PlaylistInputs } from '@/pages/PlaylistsPage/components/CreatePlaylist/types/PlaylistInputs';

import { TextButton, TextSecondaryButton } from '@/ui/Button';
import { DefaultInput } from '@/ui/Input';
import { Modal } from '@/ui/Modal';

import playlistThumbnailNew from '../../../../../public/playlistThumbnailNew.jpg';

export const CreatePlaylist: React.FC = React.memo(() => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const enableModal = () => {
    setIsModalActive(true);
    document.body.style.overflow = 'hidden';
  };

  const disableModal = () => {
    setIsModalActive(false);
    document.body.style.overflow = 'auto';
  };

  const { user, createPlaylist, setIsPlaylistsLoading, clearPlaylists } =
    useStore(
      ({ user, createPlaylist, setIsPlaylistsLoading, clearPlaylists }) => ({
        user,
        createPlaylist,
        setIsPlaylistsLoading,
        clearPlaylists,
      }),
    );

  const {
    formState: { errors },
    handleSubmit,
    control,
    setError,
    setValue,
    clearErrors,
  } = useForm<PlaylistInputs>({
    defaultValues: {
      playlistName: '',
    },
  });

  const onSubmit: SubmitHandler<PlaylistInputs> = (formData) => {
    const { playlistName } = formData;

    createPlaylist(playlistName, user?.id!)
      .then(() => {
        setValue('playlistName', '');
        clearPlaylists();
        setIsPlaylistsLoading(true);
        disableModal();
      })
      .catch(({ fieldErrors }: ServerErrors) => {
        if (fieldErrors) {
          fieldErrors.forEach((serverError) => {
            const { name, message } = serverError;

            setError(`root.${name}`, { type: 'server side', message });
          });
        }
      });
  };

  return (
    <div>
      <button
        type="button"
        onClick={enableModal}
        className="w-full h-full flex items-center md:flex-col gap-4 md:gap-8 md:items-start"
      >
        <img
          src={playlistThumbnailNew}
          alt="new playlist"
          className="w-16 md:w-full rounded-lg"
        />

        <h3 className="font-rubik font-normal text-base md:font-semibold text-on-primary-anti-flash-white">
          Новый плейлист
        </h3>
      </button>

      <Modal isModalActive={isModalActive} disableModal={disableModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="playlistName"
            control={control}
            render={({ field }) => (
              <DefaultInput
                value={field.value}
                onChange={(event) => {
                  clearErrors('root');
                  field.onChange(event.target.value);
                }}
                labelText="Новый плейлист"
                placeholder="Название плейлиста"
                error={
                  errors.root && errors.root.name
                    ? errors.root!.name.message
                    : ''
                }
              />
            )}
          />

          <div className="grid grid-cols-2 gap-12 mt-8">
            <TextButton
              title="Отменить"
              handler={disableModal}
              className="!text-left"
            />

            <TextSecondaryButton
              type="submit"
              title="Сохранить"
              handler={() => {}}
              className="!text-right"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
});
