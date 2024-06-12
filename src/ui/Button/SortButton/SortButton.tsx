import React from 'react';

type Props = {
  title: string;
  className?: string;
  disabled?: boolean;
  isOpen: boolean;
  onMouseDown: React.MouseEventHandler<HTMLButtonElement>;
};

const SortButton: React.FC<Props> = React.memo(
  ({ title, className, disabled = false, isOpen, onMouseDown }) => {
    return (
      <button
        onMouseDown={onMouseDown}
        className={`${className} focus:outline-none`}
        disabled={disabled}
      >
        <div className="flex gap-3.5 items-center">
          <span className={`${disabled && 'text-secondary-cadet-gray'}`}>
            {title}
          </span>

          <svg
            className={`${!isOpen && 'rotate-[270deg]'} ${disabled && 'stroke-secondary-cadet-gray'} stroke-on-primary-anti-flash-white transition-all duration-200 rotate-90`}
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.99995 0.999939C6.99995 0.999939 1.00001 5.41887 1 6.99999C0.999987 8.5811 7 12.9999 7 12.9999"
              stroke="inherit"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
    );
  },
);

export default SortButton;
