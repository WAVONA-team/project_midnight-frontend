import React from 'react';

import classNames from 'classnames';

import { classNames as inputClassnames } from '@/ui/Input/classNames';

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;

  className?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
};

const DefaultInput: React.FC<Props> = React.memo(
  ({
    value,
    onChange,
    className = '',
    placeholder = '',
    error,
    disabled = false,
  }) => {
    return (
      <label className="relative block">
        {error && (
          <p className="absolute top-0 text-error-imperial-red">{error}</p>
        )}

        <input
          className={classNames(
            `${className}
            mt-7
            px-4
            py-2
            ${inputClassnames.input}
            disabled:placeholder:bg-secondary-cadet-gray
            disabled:placeholder:text-on-secondary-dim-gray`,
            {
              'border-error-imperial-red': error,
              'border-on-secondary-platinum': !error,
            },
          )}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      </label>
    );
  },
);

export default DefaultInput;