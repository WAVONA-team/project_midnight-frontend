import React, { useRef, useState } from 'react';

import { useStore } from '@/store';
import { Menu } from '@headlessui/react';

import Dropdown from '@/components/Dropdown/Dropdown.tsx';
import Portal from '@/components/Portal/Portal';

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
  const [childElement, setChildElement] = useState<HTMLElement | null>(null);
  const ref = useRef(null);

  const handlerModal = ({
    currentTarget,
  }: React.MouseEvent<HTMLDivElement> & { trackId?: string }) => {
    if (currentTarget === childElement) {
      setIsOpen((state) => !state);
    } else {
      const element = currentTarget as HTMLElement;

      setChildElement(element);

      setIsOpen((state) => !state);
    }
  };

  return (
    <div>
      <Menu as="div">
        <div
          onClick={handlerModal}
          className="relative"
          ref={ref}
          onBlur={() => setIsOpen(false)}
          tabIndex={0}
        >
          <button type="button" className="focus:outline-none">
            <DotsIcon active={isOpen} />
          </button>
        </div>

        <Portal openPortal={isOpen} element={childElement}>
          <Dropdown
            className="
              sm:right-0
              sm:top-8
              sm:w-[254px]
              sm:absolute
              py-4
              sm:py-0
              shadow-[16px_-16px_16px_0px_#0C0D0B80]
            "
            modalOnCloseHandler={() => setIsOpen(false)}
          >
            <Menu.Item as="div">
              <TrackSaveOnMainButton className="" />
            </Menu.Item>

            <Menu.Item as="div">
              <AddToPlaylist className="rounded-none" />
            </Menu.Item>

            <Menu.Item as="div">
              <AddToQueueButton className="rounded-none" />
            </Menu.Item>

            <Menu.Item as="div">
              <TrackShareButton
                selectedTrack={currentTrack!}
                className="rounded-none"
              />
            </Menu.Item>

            <Menu.Item as="div">
              <DeleteTrackButton className="" />
            </Menu.Item>
          </Dropdown>
        </Portal>
      </Menu>
    </div>
  );
});
