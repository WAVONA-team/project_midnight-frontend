import React from 'react';
import AuthCode from 'react-auth-code-input';

type Props = {
  length?: number;
  onChange: (res: string) => void;
  inputClassName?: string;
  containerClassName?: string;
};

const OTPInput: React.FC<Props> = React.memo(
  ({ length = 6, onChange, inputClassName = '', containerClassName = '' }) => {
    return (
      <AuthCode
        allowedCharacters="numeric"
        length={length}
        onChange={onChange}
        autoFocus={false}
        inputClassName={`${inputClassName} text-on-primary-anti-flash-white bg-[transparent] border-b border-b-on-primary-anti-flash-white focus:outline-none w-6 text-center`}
        containerClassName={`${containerClassName} flex gap-4`}
      />
    );
  },
);

export default OTPInput;
