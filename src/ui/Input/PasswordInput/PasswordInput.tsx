import React, { useState } from 'react';

import classNames from 'classnames';

import { classNames as inputClassnames } from '@/ui/Input/classNames';

import passwordHideIcon from '../../../../public/inputs/passwordHide.svg';
import passwordShowIcon from '../../../../public/inputs/passwordShowed.svg';

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  labelText: string;

  className?: string;
  placeholder?: string;
  error?: string;
};

const PasswordInput: React.FC<Props> = React.memo(
  ({ value, onChange, labelText, className = '', placeholder = '', error }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
      <label className={`${className} relative block`}>
        <p className="text-base text-on-primary-anti-flash-white font-bold">
          {labelText}
        </p>

        {error && (
          <p className="absolute top-8 text-xs text-error-imperial-red">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={() => setIsPasswordVisible((prev) => !prev)}
          className={`${inputClassnames.icon} right-4`}
        >
          {isPasswordVisible ? (
            <img src={passwordShowIcon} alt="Show password" />
          ) : (
            <img src={passwordHideIcon} alt="Hide password" />
          )}
        </button>

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
              'border-secondary-eerie-black-light': !error,
            },
          )}
          type={isPasswordVisible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </label>
    );
  },
);

export default PasswordInput;
