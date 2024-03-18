import React from 'react';

type Props = {
  text: string;
};

const FormError: React.FC<Props> = React.memo(({ text }) => {
  return (
    <p className="text-error-imperial-red text-sm absolute top-44 translate-y-2">
      {text}
    </p>
  );
});

export default FormError;
