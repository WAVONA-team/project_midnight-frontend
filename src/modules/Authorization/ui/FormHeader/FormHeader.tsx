import React from 'react';

type Props = {
  title: string;
};

const FormHeader: React.FC<Props> = React.memo(({ title }) => {
  return (
    <h2 className="text-on-primary-anti-flash-white font-rubik font-semibold text-2xl block mt-10 lg:font-openSans lg:font-normal lg:text-2xl">
      {title}
    </h2>
  );
});

export default FormHeader;
