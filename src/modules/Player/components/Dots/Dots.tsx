import React, { useRef, useState } from 'react';

import { useStore } from '@/store';
import { Menu } from '@headlessui/react';

import { createPlayerSlice } from '@/modules/Player/store';
import TrackDeleteButton from '@/modules/TrackModal/components/buttons/TrackDeleteButton/TrackDeleteButton';
import TrackSaveOnMainButton from '@/modules/TrackModal/components/buttons/TrackSaveOnMainButton/TrackSaveOnMainButton';

import Dropdown from '@/components/Dropdown/Dropdown.tsx';
import Portal from '@/components/Portal/Portal';

import { TrackShareButton } from '@/ui/Button';
import DotsIcon from '@/ui/icons/DotsIcon/DotsIcon';

import { classNamesBase } from './classNames';

export const Dots: React.FC = React.memo(() => {
  const { currentTrack } = createPlayerSlice();

  const { checkSavedTrack, user } = useStore(({ checkSavedTrack, user }) => ({
    checkSavedTrack,
    user,
  }));

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState(false);
  const [childElement, setChildElement] = useState<HTMLElement | null>(null);
  const ref = useRef(null);

  const handlerModal = ({
    currentTarget,
  }: React.MouseEvent<HTMLDivElement> & { trackId?: string }) => {
    if (currentTarget === childElement) {
      checkSavedTrack(currentTrack!.id, user!.id)
        .then(() => setIsSaved(true))
        .catch(() => setIsSaved(false))
        .finally(() => setIsOpen((state) => !state));
    } else {
      const element = currentTarget as HTMLElement;
      setChildElement(element);

      checkSavedTrack(currentTrack!.id, user!.id)
        .then(() => setIsSaved(true))
        .catch(() => setIsSaved(false))
        .finally(() => setIsOpen((state) => !state));
    }
  };

  const onBlurHandler = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Menu
        as="div"
        className="relative"
        ref={ref}
        onClick={handlerModal}
        onBlur={onBlurHandler}
        tabIndex={0}
      >
        <button
          type="button"
          className="focus:outline-none focus-visible:outline-none"
        >
          <DotsIcon active={isOpen} />
        </button>

        <Portal openPortal={isOpen} element={childElement}>
          <Dropdown
            className="
              sm:right-0
              sm:bottom-10
              sm:min-w-[265px]
              sm:absolute
              py-4
              sm:py-0
              shadow-[16px_-16px_16px_0px_#0C0D0B80]
              overflow-hidden
            "
            modalOnCloseHandler={() => setIsOpen(false)}
          >
            <Menu.Item
              as={TrackSaveOnMainButton}
              selectedTrack={currentTrack!}
              trackIsSaved={isSaved}
              setGlobalTrackIsSaved={setIsSaved}
              className={classNamesBase.modalItemButtons}
            />

            <Menu.Item
              as={TrackShareButton}
              selectedTrack={currentTrack!}
              className={classNamesBase.modalItemButtons}
            />

            <Menu.Item
              as={TrackDeleteButton}
              selectedTrack={currentTrack!}
              className={classNamesBase.modalItemButtons}
            />
          </Dropdown>
        </Portal>
      </Menu>
    </div>
  );
});
