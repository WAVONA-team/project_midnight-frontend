import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar: React.FC = React.memo(() => {
  return (
    <aside className="w-full h-16 py-3 flex-row  bg-surface-eerie_black flex justify-between lg:w-72 lg:h-full lg:py-2 lg:flex-col font-rubik">
      <div className=" w-full ">
        <div className="py-4 pl-6 hidden lg:flex">
          <div className="flex text-on-primary-anti-flash-white font-ubuntu">
            <img
              src="src\assets\logo.svg"
              alt=""
              height={28}
              width={24}
              className=" mr-1"
            />
            <p>Midnight</p>
          </div>
        </div>
        <div className="grid grid-cols-3 px-3 justify-items-center w-full lg:flex lg:flex-col lg:px-0">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'bg-secondary-eerie-black-light text-on-primary-anti-flash-white hover:text-on-primary-lavender-blush flex flex-col items-center pl-0 py-0 gap-0 lg:flex-row lg:pl-6 lg:py-4 lg:gap-5'
                : 'text-secondary-cadet-gray flex flex-col items-center pl-0 py-0 gap-0 lg:flex-row lg:pl-6 lg:py-4 lg:gap-5 hover:bg-secondary-jet hover:text-on-primary-lavender-blush'
            }
            to="/tracks" end
          >
            <img
              src="src\assets\navBar\home.svg"
              alt=""
              height={18}
              width={18}
            />
            <p>Главная</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'bg-secondary-eerie-black-light text-on-primary-anti-flash-white hover:text-on-primary-lavender-blush flex flex-col items-center pl-0 py-0 gap-0 lg:flex-row lg:pl-6 lg:py-4 lg:gap-5'
                : 'text-secondary-cadet-gray flex flex-col items-center pl-0 py-0 gap-0 lg:flex-row lg:pl-6 lg:py-4 lg:gap-5 hover:bg-secondary-jet hover:text-on-primary-lavender-blush'
            }
            to="/playlists"
          >
            <img
              src="src\assets\navBar\playlist.svg"
              alt=""
              height={20}
              width={20}
            />
            <p>Плейлисты</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'bg-secondary-eerie-black-light text-on-primary-anti-flash-white hover:text-on-primary-lavender-blush flex flex-col items-center pl-0 py-0 gap-0 lg:flex-row lg:pl-6 lg:py-4 lg:gap-5'
                : 'text-secondary-cadet-gray flex flex-col items-center pl-0 py-0 gap-0 lg:flex-row lg:pl-6 lg:py-4 lg:gap-5 hover:bg-secondary-jet hover:text-on-primary-lavender-blush'
            }
            to="/tracks/new"
          >
            <img
              src="src\assets\navBar\addTrack.svg"
              alt=""
              height={20}
              width={20}
            />
            <p>Добавить трек</p>
          </NavLink>
        </div>
      </div>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? 'bg-secondary-eerie-black-light text-on-primary-anti-flash-white hover:text-on-primary-lavender-blush flex flex-col items-center pl-0 py-0 gap-0 lg:flex-row lg:pl-6 lg:py-4 lg:gap-5'
            : 'text-secondary-cadet-gray flex flex-col items-center pl-0 py-0 gap-0 lg:flex-row lg:pl-6 lg:py-4 lg:gap-5 hover:bg-secondary-jet hover:text-on-primary-lavender-blush'
        }
        to="./settings"
      >
        <img
          src="src\assets\navBar\settings.svg"
          alt=""
          height={20}
          width={20}
        />
        <p>Настройки</p>
      </NavLink>
    </aside>
  );
});

export default NavBar;
