import React from 'react';

type Props = {
  className?: string;
  icon: string;
  title: string;
  handler: React.MouseEventHandler<HTMLButtonElement>;
  ref: React.ForwardedRef<HTMLButtonElement>;
};

const MenuButton: React.FC<Props> = React.memo(
  React.forwardRef(({ className = '', handler, icon, title }, ref) => {
    return (
      <button
        ref={ref}
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
          hover:bg-secondary-eerie-black-light
        `}
      >
        <div className="flex p-4">
          <img src={icon} alt={title} />

          <div
            className="
              text-on-primary-anti-flash-white
              pl-4
              font-normal
              text-base
              tracking-widest
              whitespace-nowrap
            "
          >
            {title}
          </div>
        </div>
      </button>
    );
  }),
);

export default MenuButton;
