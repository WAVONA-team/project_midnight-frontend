import React from 'react';

import classNames from 'classnames';

import generalClassNames from '@/ui/icons/helpers/generalClassNames ';

type Props = {
  active: boolean;
};

const DotsIcon: React.FC<Props> = React.memo(({ active = false }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="transparent"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames({
        [generalClassNames.active]: active,
        [generalClassNames.base]: !active,
      })}
    >
      <rect
        x="18"
        y="10.5"
        width="3"
        height="3"
        rx="1"
        stroke="#EBEBEB"
        stroke-width="1.5"
      />
      <rect
        x="10.5"
        y="10.5"
        width="3"
        height="3"
        rx="1"
        stroke="#EBEBEB"
        stroke-width="1.5"
      />
      <rect
        x="3"
        y="10.5"
        width="3"
        height="3"
        rx="1"
        stroke="#EBEBEB"
        stroke-width="1.5"
      />
    </svg>
  );
});

export default DotsIcon;
