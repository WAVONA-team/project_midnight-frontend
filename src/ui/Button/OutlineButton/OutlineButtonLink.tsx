import React from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames';

import { classNamesBase } from './classNames';

type Props = {
  path: string;
  title: string;
  handler?: React.MouseEventHandler<HTMLAnchorElement>;
  className?: string;
  disabled?: boolean;
};

const OutlineButtonLink: React.FC<Props> = React.memo(
  ({ path, title, handler, className = '', disabled = true }) => {
    const baseClass = classNames({
      [classNamesBase.outlineButton]: true,
      [classNamesBase.outlineButtonLinkDisabled]: disabled,
      [className]: true,
    });

    return (
      <Link to={path} className={baseClass} onClick={handler}>
        {title}
      </Link>
    );
  },
);

export default OutlineButtonLink;
