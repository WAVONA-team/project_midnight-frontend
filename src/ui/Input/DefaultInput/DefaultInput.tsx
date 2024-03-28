import React from 'react';

import classNames from 'classnames';

import { classNames as inputClassnames } from '@/ui/Input/classNames';

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  labelText: string;
  withoutLabel?: boolean;
  className?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
};

const DefaultInput: React.FC<Props> = React.memo(
  ({
    value,
    onChange,
    labelText,
    withoutLabel = false,
    className = '',
    placeholder = '',
    error,
    disabled = false,
  }) => {
    return (
      <label className={`${className} relative block`}>
        <p
          className={classNames(
            'text-base text-on-primary-anti-flash-white font-bold ',
            { 'lg:hidden': withoutLabel },
          )}
        >
          {labelText}
        </p>
        {error && (
          <p
            className={classNames(
              'absolute  top-8  text-xs text-error-imperial-red',
              { 'lg:top-3': withoutLabel },
            )}
          >
            {error}
          </p>
        )}

        <input
          className={classNames(
            ` 
              mt-8
              px-4
              py-2
              ${inputClassnames.input}
              disabled:placeholder:bg-secondary-cadet-gray
              disabled:placeholder:text-on-secondary-dim-gray
            `,
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
