import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import classNames from 'classnames';

import { Logo } from '@/ui/Logo';

type Props = {
  className?: string;
};

const NavBar: React.FC<Props> = React.memo(({ className = '' }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'navBar' });

  const linksInfo = [
    {
      img: '/navBar/home.svg',
      title: t('main'),
      path: '/tracks',
    },
    {
      img: '/navBar/playlist.svg',
      title: t('playlists'),
      path: '/playlists',
    },
    {
      img: '/navBar/addTrack.svg',
      title: t('addTrack'),
      path: '/tracks/new',
    },
  ];

  return (
    <aside
      className={`
        ${className}
        sticky
        z-[1]
        bottom-0
        w-full
        py-3
        flex-row
        bg-surface-eerie_black
        flex
        justify-between
        lg:w-72
        lg:top-0
        lg:h-screen
        lg:py-2
        lg:flex-col
        font-rubik
      `}
    >
      <div className="relative w-full h-full">
        <Logo
          className="py-4 pl-6 hidden lg:flex"
          logoWidth="w-6"
          textSize="text-lg"
        />

        <div className="grid grid-cols-3 px-3 justify-items-center w-full lg:flex lg:flex-col lg:px-0">
          {linksInfo.map((link) => {
            const { img, title, path } = link;

            return (
              <NavLink
                className={({ isActive }) =>
                  classNames(
                    'transition flex flex-col items-center px-4 py-2 gap-0 lg:flex-row lg:pl-6 lg:py-4 lg:gap-5 hover:text-on-primary-lavender-blush',
                    {
                      'text-on-primary-anti-flash-white lg:bg-secondary-eerie-black-light':
                        isActive,
                      'text-secondary-cadet-gray lg:hover:bg-secondary-jet':
                        !isActive,
                    },
                  )
                }
                to={path}
                key={path}
                end
              >
                <img src={img} alt={title} height={18} width={18} />

                <p className="text-xs lg:text-sm">{title}</p>
              </NavLink>
            );
          })}

          <NavLink
            className={({ isActive }) =>
              classNames(
                'hidden lg:absolute lg:bottom-0 lg:w-full transition lg:flex flex-col items-center pl-0 py-0 gap-0 lg:flex-row lg:pl-6 lg:py-4 lg:gap-5 hover:text-on-primary-lavender-blush',
                {
                  'text-on-primary-anti-flash-white lg:bg-secondary-eerie-black-light':
                    isActive,
                  'text-secondary-cadet-gray lg:hover:bg-secondary-jet':
                    !isActive,
                },
              )
            }
            to="/settings"
          >
            <img
              src="/navBar/settings.svg"
              alt="Настройки"
              height={20}
              width={20}
            />

            <p className="text-xs lg:text-sm">{t('settings')}</p>
          </NavLink>
        </div>
      </div>
    </aside>
  );
});

export default NavBar;
