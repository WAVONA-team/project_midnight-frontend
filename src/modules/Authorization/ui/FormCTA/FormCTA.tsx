import React from 'react';

type Props = {
  text: string;
  action: React.ReactNode;
};

const FormCTA: React.FC<Props> = React.memo(({ text, action }) => {
  return (
    <div className="flex items-center mt-16">
      <p className="text-on-primary-anti-flash-white text-sm flex items-center">
        {text}
      </p>

      {action}
    </div>
  );
});

export default FormCTA;
