import React from 'react';

import classNames from 'classnames';

import { classNames as inputClassnames } from '@/ui/Input/classNames';

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;

  className?: string;
  placeholder?: string;
  error?: string;
  maxLength?: number;

  inputRef?: React.RefObject<HTMLInputElement>;
};

const DefaultInput: React.FC<Props> = React.memo(
  ({
    value,
    onChange,
    className = '',
    placeholder = '',
    error,
    maxLength,
    inputRef,
  }) => {
    return (
      <label className="relative block">
        {error && <p className="absolute top-0">{error}</p>}

        <input
          className={classNames(
            `${className}
            mt-7
            ${inputClassnames.input}
            disabled:placeholder:bg-secondary-cadet-gray
            disabled:placeholder:text-on-secondary-dim-gray`,
            {
              'border-2 border-error-imperial-red': error,
            },
          )}
          type="text"
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

export default DefaultInput;
