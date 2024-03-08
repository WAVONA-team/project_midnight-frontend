import React from 'react';

import classNames from 'classnames';

import { classNames as inputClassnames } from '@/ui/Input/classNames';

import searchIcon from '@/assets/inputs/search.svg';

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;

  className?: string;
  placeholder?: string;
  error?: string;
};

const SearchInput: React.FC<Props> = React.memo(
  ({ value, onChange, className = '', placeholder = '', error }) => {
    return (
      <label className="relative block">
        {error && (
          <p className="absolute top-0 text-error-imperial-red">{error}</p>
        )}

        <img
          src={searchIcon}
          alt="search"
          className={`${inputClassnames.icon} left-4`}
        />

        <input
          className={classNames(
            `${className}
            mt-7
            pr-4
            pl-11
            py-2
            ${inputClassnames.input}
            `,
            {
              'border-error-imperial-red': error,
              'border-on-secondary-platinum': !error,
            },
          )}
          type="search"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </label>
    );
  },
);

export default SearchInput;
