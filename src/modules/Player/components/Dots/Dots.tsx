import React, { useState } from 'react';

import { Menu } from '@headlessui/react';

import Dropdown from '@/components/Dropdown/Dropdown.tsx';

import { TrackShareButton } from '@/ui/Button';
import AddToPlaylist from '@/ui/Button/MenuButton/AddToPlaylistButton/AddToPlaylistButton';
import AddToQueueButton from '@/ui/Button/MenuButton/AddToQueueButton/AddToQueueButton';
import DeleteTrackButton from '@/ui/Button/MenuButton/DeleteTrackButton/DeleteTrackButton';
import TrackSaveOnMainButton from '@/ui/Button/MenuButton/TrackSaveOnMainButton/TrackSaveOnMainButton';
import DotsIcon from '@/ui/icons/DotsIcon/DotsIcon';

export const Dots: React.FC = React.memo(() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button type="button" onClick={openMenu} className='focus:outline-none'>
        <DotsIcon active={isOpen} />
      </button>
      <Menu as="div" className="relative">
        <Dropdown
          className="
          right-0
          bottom-8
          w-[266px]
          absolute
          shadow-dropdown-bottom-shadow
          "
          isOpen={isOpen}
          setIsOpen={openMenu}
        >
          <TrackSaveOnMainButton  className="" />
          <AddToPlaylist className="rounded-none" />
          <AddToQueueButton className="rounded-none" />
          <TrackShareButton trackName="" trackUrl="" className="rounded-none" />
          <DeleteTrackButton className="" />
        </Dropdown>
      </Menu>
    </div>
  );
});
