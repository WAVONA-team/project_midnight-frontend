import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const FormContainer: React.FC<Props> = React.memo(
  ({ className = '', children }) => {
    return (
      <div
        className={`${className} px-4 py-12 lg:bg-surface-eerie_black lg:px-12 lg:rounded-lg lg:max-w-xl`}
      >
        {children}
      </div>
    );
  },
);

export default FormContainer;
