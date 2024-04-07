import React from 'react';

type Props = {
  className?: string;
  icon: string;
  title: string;
  handler: React.MouseEventHandler<HTMLButtonElement>;
};

const MenuButton: React.FC<Props> = React.memo(
  ({ className = '', handler, icon, title }) => {
    return (
      <button
        onClick={handler}
        className={`
          ${className}
          bg-[inherit]
          w-full
          border-t-0
          border-l-0
          border-r-0
          border-b
          border-secondary-eerie-black-light
          border-solid
          outline-none
          focus:outline-none
          hover:border-secondary-eerie-black-light
        `}
      >
        <div className="flex p-4">
          <img src={icon} alt={title} />
          <span
            className="
              text-on-primary-anti-flash-white
              ml-4
              font-normal
              text-base
              tracking-widest
            "
          >
            {title}
          </span>
        </div>
      </button>
    );
  },
);

export default MenuButton;