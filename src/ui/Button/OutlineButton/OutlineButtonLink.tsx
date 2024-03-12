import React from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames';

import { classNamesBase } from './classNames';

type Props = {
  path: string;
  title: string;

  className?: string;
  disabled?: boolean;
};

const OutlineButtonLink: React.FC<Props> = React.memo(
  ({ path, title, className = '', disabled = false }) => {
    const baseClass = classNames({
      [classNamesBase.outlineButton]: true,
      [classNamesBase.outlineButtonLinkDisabled]: disabled,
      [className]: true,
    });

    return (
      <Link to={path} className={baseClass}>
        <div className="absolute z-10 top-0 right-0 bottom-0 left-0 flex justify-center items-center rounded">
          {title}
        </div>
      </Link>
    );
  },
);

export default OutlineButtonLink;
