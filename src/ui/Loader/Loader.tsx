import React from 'react';

type Props = {
  widthValue: string;
  heightValue: string;
};

const Loader: React.FC<Props> = React.memo(({ widthValue, heightValue }) => {
  const width = `w-${widthValue}`;
  const height = `h-${heightValue}`;

  return (
    <div className="flex w-full items-center justify-center">
      <div
        className={`
          border-l-red-600
          m-auto
          ${width}
          ${height}
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
