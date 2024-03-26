import React from 'react';

type Props = {
  width?: string;
  height?: string;
  thicknessWidth?: string;
  thicknessHeight?: string;
  className?: string;
};

const Spinner: React.FC<Props> = React.memo(
  ({
    width = 'w-7',
    height = 'h-7',
    thicknessWidth = 'w-5',
    thicknessHeight = 'h-5',
    className = '',
  }) => {
    return (
      <div
        className={`${className} bg-[inherit] absolute z-10 top-0 right-0 bottom-0 left-0 flex justify-center items-center rounded`}
      >
        <div
          className={`${width} ${height} grid place-items-center rounded-full animate-spin bg-gradient-to-t from-on-primary-lavender-blush`}
        />

        <div
          className={`${thicknessWidth} ${thicknessHeight} bg-[inherit] absolute rounded-full`}
        />
      </div>
    );
  },
);

export default Spinner;
