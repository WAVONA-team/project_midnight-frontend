import { FC, ReactNode, useLayoutEffect } from 'react';

import { Menu } from '@headlessui/react';

import Dropdown from '@/components/Dropdown/Dropdown';

import DropdownTrackInfo from './DropdownTrackInfo';

type Props = {
  showModal: boolean;
  modalOnCloseHandler: () => void;
  trackAuthor: string | null;
  trackImgUrl: string | null;
  trackTitle: string | null;
  trackSource: string | null;
  actionButtons: ReactNode;
};

const TrackModal: FC<Props> = ({
  showModal,
  modalOnCloseHandler,
  trackAuthor,
  trackImgUrl,
  trackTitle,
  trackSource,
  actionButtons,
}) => {
  useLayoutEffect(() => {
    if (window.innerWidth < 640) {
      document.body.classList.add('overflow-hidden');

      return () => {
        if (showModal) {
          document.body.classList.remove('overflow-hidden');
        }
      };
    }
  }, []);

  return (
    <Menu>
      <Dropdown
        headerItem={
          trackTitle &&
          trackSource &&
          trackAuthor &&
          trackImgUrl && (
            <DropdownTrackInfo
              artist={trackAuthor}
              imgUrl={trackImgUrl}
              name={trackTitle}
              provider={trackSource}
            />
          )
        }
        className="
          sm:right-0
          sm:top-8
          sm:min-w-[265px]
          sm:absolute        
          py-4
          sm:py-0
          shadow-[16px_-16px_16px_0px_#0C0D0B80]
        "
        modalOnCloseHandler={modalOnCloseHandler}
      >
        {actionButtons}
      </Dropdown>
    </Menu>
  );
};

export default TrackModal;
