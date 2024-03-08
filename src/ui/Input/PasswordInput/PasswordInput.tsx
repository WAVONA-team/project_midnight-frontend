import React, { useState } from 'react';

import classNames from 'classnames';

import { classNames as inputClassnames } from '@/ui/Input/classNames';

import passwordHideIcon from '@/assets/inputs/passwordHide.svg';
import passwordShowIcon from '@/assets/inputs/passwordShowed.svg';

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;

  className?: string;
  placeholder?: string;
  error?: string;
  maxLength?: number;

  inputRef?: React.RefObject<HTMLInputElement>;
};

const PasswordInput: React.FC<Props> = React.memo(
  ({
    value,
    onChange,
    className = '',
    placeholder = '',
    error,
    maxLength,
    inputRef,
  }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
      <label className="relative block">
        {error && (
          <p className="absolute top-0 text-error-imperial-red">{error}</p>
        )}

        <button
          type="button"
          onClick={() => setIsPasswordVisible((prev) => !prev)}
          className="absolute right-4 top-1/2 translate-y-0.5"
        >
          {isPasswordVisible ? (
            <img src={passwordShowIcon} alt="Show password" />
          ) : (
            <img src={passwordHideIcon} alt="Hide password" />
          )}
        </button>

        <input
          className={classNames(
            `${className}
            mt-7
            ${inputClassnames.input}
            disabled:placeholder:bg-secondary-cadet-gray
            disabled:placeholder:text-on-secondary-dim-gray`,
            {
              'border-error-imperial-red': error,
              'border-on-secondary-platinum': !error,
            },
          )}
          type={isPasswordVisible ? 'text' : 'password'}
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

export default PasswordInput;
