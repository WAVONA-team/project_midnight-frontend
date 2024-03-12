import React from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames';

import { classNamesBase } from './classNames';

type Props = {
  path: string;
  title: string;
  className?: string;
  disabled?: boolean;
  withArrow?: boolean;
};

const TextButtonLink: React.FC<Props> = React.memo(
  ({ path, title, className = '', disabled = false, withArrow = false }) => {
    const baseClass = classNames({
      [classNamesBase.textButton]: true,
      [classNamesBase.textButtonLinkDisabled]: disabled,
      [className]: true,
    });
    return (
      <Link to={path} className={baseClass}>
        {title}
        {withArrow && (
          <div className="ml-2">
            <svg
              width="14"
              height="8"
              viewBox="0 0 14 8"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-[transparent]"
            >
              <path
                d="M13 1.00005C13 1.00005 8.58107 6.99999 6.99995 7C5.41884 7.00001 1 1 1 1"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </Link>
    );
  },
);

export default TextButtonLink;
