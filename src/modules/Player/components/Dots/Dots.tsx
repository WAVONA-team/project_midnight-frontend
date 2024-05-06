import React, { useState } from 'react';

import { useStore } from '@/store';
import { Menu } from '@headlessui/react';

import Dropdown from '@/components/Dropdown/Dropdown.tsx';

import { TrackShareButton } from '@/ui/Button';
import AddToPlaylist from '@/ui/Button/MenuButton/AddToPlaylistButton/AddToPlaylistButton';
import AddToQueueButton from '@/ui/Button/MenuButton/AddToQueueButton/AddToQueueButton';
import DeleteTrackButton from '@/ui/Button/MenuButton/DeleteTrackButton/DeleteTrackButton';
import TrackSaveOnMainButton from '@/ui/Button/MenuButton/TrackSaveOnMainButton/TrackSaveOnMainButton';
import DotsIcon from '@/ui/icons/DotsIcon/DotsIcon';

export const Dots: React.FC = React.memo(() => {
  const { currentTrack } = useStore(({ currentTrack }) => ({
    currentTrack,
  }));
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button type="button" onClick={openMenu} className="focus:outline-none">
        <DotsIcon active={isOpen} />
      </button>
      <Menu as="div" className="relative ">
        <Dropdown className="" isOpen={isOpen} setIsOpen={openMenu}>
          <div
            className="
            bg-surface-eerie_black
          w-[370px]
          right-5
          bottom-20
          absolute
          shadow-dropdown-bottom-shadow
          z-10"
          >
            <TrackSaveOnMainButton className="" />
            <AddToPlaylist className="rounded-none" />
            <AddToQueueButton className="rounded-none" />
            <TrackShareButton
              trackName={currentTrack?.title || ''}
              trackUrl={currentTrack?.url || ''}
              className="rounded-none"
            />
            <DeleteTrackButton className="" />
          </div>
        </Dropdown>
      </Menu>
    </div>
  );
});
