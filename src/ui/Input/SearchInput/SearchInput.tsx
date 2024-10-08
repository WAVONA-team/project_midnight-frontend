import React from 'react';

import classNames from 'classnames';

import { classNames as inputClassnames } from '@/ui/Input/classNames';

import clearIcon from '../../../../public/inputs/clear.svg';
import searchIcon from '../../../../public/inputs/search.svg';
import searchDisabled from '../../../../public/inputs/searchDisabled.svg';

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  clearValue: React.MouseEventHandler<HTMLButtonElement>;

  className?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
};

const SearchInput: React.FC<Props> = React.memo(
  ({
    value,
    onChange,
    clearValue,
    className = '',
    placeholder = '',
    disabled = false,
    error,
  }) => {
    return (
      <label className={`relative block ${className}`}>
        {error && (
          <p className="absolute top-1 text-xs text-error-imperial-red">
            {error}
          </p>
        )}

        <div className="relative mt-7">
          <img
            src={disabled ? searchDisabled : searchIcon}
            alt="search"
            className="absolute top-[10px] left-4"
          />

          {!!value.length && (
            <button
              type="button"
              onClick={clearValue}
              className="absolute top-2 right-4"
            >
              <img src={clearIcon} alt="clear" />
            </button>
          )}

          <input
            className={classNames(
              `
              mt-7
              pr-4
              pl-11
              py-2
              ${inputClassnames.input}
            `,
              {
                'border-error-imperial-red': error,
                'border-secondary-eerie-black-light': !error,
              },
            )}
            type="search"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
          />
        </div>
      </label>
    );
  },
);

export default SearchInput;
