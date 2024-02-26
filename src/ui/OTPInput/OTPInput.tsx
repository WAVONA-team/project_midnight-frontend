import React from 'react';
import AuthCode from 'react-auth-code-input';

type Props = {
  length?: number;
  onChange: (res: string) => void;
  inputClassName?: string;
  containerClassName?: string;
  error?: string;
};

const OTPInput: React.FC<Props> = React.memo(
  ({
    length = 6,
    onChange,
    inputClassName = '',
    containerClassName = '',
    error,
  }) => {
    return (
      <label>
        {error && <p>{error}</p>}

        <AuthCode
          length={length}
          onChange={onChange}
          autoFocus={false}
          inputClassName={`${inputClassName} border border-red-500`}
          containerClassName={`${containerClassName}`}
        />
      </label>
    );
  },
);

export default OTPInput;
