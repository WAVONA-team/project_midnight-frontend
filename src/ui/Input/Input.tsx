import React from 'react';

type Props = {
  type: 'text' | 'email' | 'password';
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  placeholder?: string;
  error?: string;
  maxLength?: number;
  inputRef?: React.RefObject<HTMLInputElement>;
};

const Input: React.FC<Props> = React.memo(
  ({
    type,
    value,
    onChange,
    className = '',
    placeholder = '',
    error,
    maxLength,
    inputRef,
  }) => {
    return (
      <label>
        {error && <p>{error}</p>}

        <input
          className={`${className} border border-red-500 m-2`}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          ref={inputRef}
        />
      </label>
    );
  },
);

export default Input;
