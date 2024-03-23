import React from 'react';

type Props = {
  size: {
    height: string;
    width: string;
  };
};

const Loader: React.FC<Props> = React.memo(({ size }) => {
  return (
    <div className="flex w-full items-center justify-center">
      <div
        className={`
          border-l-red-600
          m-auto
          ${size.height}
          ${size.width}
          animate-spin
          rounded-full
          border-4
          border-l-4
          border-white
        `}
      />
    </div>
  );
});

export default Loader;
