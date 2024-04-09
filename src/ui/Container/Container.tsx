import React from 'react';

type Props = {
  className?: string;
  children: React.ReactNode;
};

const Container: React.FC<Props> = React.memo(
  ({ className = '', children }) => {
    return <div className={`${className} px-4`}>{children}</div>;
  },
);

export default Container;
