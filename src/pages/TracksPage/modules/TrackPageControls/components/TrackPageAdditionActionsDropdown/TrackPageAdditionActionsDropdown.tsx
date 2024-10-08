import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useStore } from '@/store';
import { Menu } from '@headlessui/react';

import Dropdown from '@/components/Dropdown/Dropdown.tsx';
import Portal from '@/components/Portal/Portal.tsx';

import { MenuButton } from '@/ui/Button';

// import addToQueueIcon from '../../../../../../../public/buttons/actionButtons/addToQueueIcon.svg';
import addTrackIcon from '../../../../../../../public/buttons/actionButtons/addTrackIcon.svg';
// import repeatIcon from '../../../../../../../public/buttons/actionButtons/repeatIcon.svg';
import kebabIcon from '../../../../../../../public/kebab/kebab.svg';

const TrackPageAdditionActionsDropdown: React.FC = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [childElement, setChildElement] = useState<HTMLElement | null>(null);

  const { t } = useTranslation('translation', { keyPrefix: 'additionActions' });
  const navigate = useNavigate();

  const { userTracks } = useStore(({ userTracks }) => ({
    userTracks,
  }));

  const additionActions = [
    {
      id: 1,
      title: t('addTrack'),
      icon: addTrackIcon,
      handler: () => navigate('/tracks/new'),
    },
    // {
    //   id: 2,
    //   title: 'Добавить в очередь',
    //   icon: addToQueueIcon,
    //   handler: () => {},
    // },
    // {
    //   id: 3,
    //   title: 'Повторить',
    //   icon: repeatIcon,
    //   handler: () => {},
    // },
  ];

  const handleClose = () => {
    setChildElement(null);
    setIsOpen(false);
  };

  const handlerModal = ({
    currentTarget,
  }: React.MouseEvent<HTMLDivElement>) => {
    if (currentTarget === childElement) {
      setIsOpen((state) => !state);
    } else {
      const element = currentTarget as HTMLElement;

      setChildElement(element);

      setIsOpen((state) => !state);
    }
  };

  return (
    <Menu
      as="div"
      className="relative"
      onClick={handlerModal}
      onBlur={handleClose}
    >
      <button
        disabled={!userTracks.length}
        className="
          p-1
          sm:border-2
          sm:border-solid
          rounded-full
          ml-3.5
          sm:border-on-secondary-davys-gray
          hover:sm:border-on-secondary-davys-gray
          focus:outline-none
        "
      >
        <img src={kebabIcon} alt="Addition Actions" />
      </button>

      <Portal openPortal={isOpen} element={childElement}>
        <Dropdown
          className="
            hover:border-t-xl
            md:left-3
            md:top-12
            md:w-[254px]
            md:absolute
            py-4
            sm:py-0
            shadow-[16px_-16px_16px_0px_#0C0D0B80]
          "
          modalOnCloseHandler={handleClose}
        >
          {additionActions.map((addition) => (
            <Menu.Item
              as={MenuButton}
              key={addition.title}
              handler={() => addition.handler()}
              icon={addition.icon}
              title={addition.title}
              className="
                last:border-b-0
                last:rounded-b-xl
                first:rounded-t-xl
                first:hover:rounded-t-xl
              "
            />
          ))}
        </Dropdown>
      </Portal>
    </Menu>
  );
});

export default TrackPageAdditionActionsDropdown;
