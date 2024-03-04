import { memo } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../spinner';

interface ActionButtonProps {
  title: string;
  path: string;
  isLoading: boolean;
  disabled: boolean;
}

function ActionButton({ title, path, disabled, isLoading }: ActionButtonProps) {
  return (
    <Link
      to={path}
      className="font-rubik text-xs font-normal leading-6
        outline-none block text-on-primary-lavender-blush rounded w-full
        hover:text-on-primary-lavender-blush hover:outline-none
      "
    >
      <button
        disabled={disabled}
        className=" 
         relative 
        p-4
        w-full 
        border-none 
        rounded 
        outline outline-1 outline-primary-poppy
        bg-primary-poppy
        hover:outline hover:outline-1 hover:outline-primary-fire-brick 
        hover:bg-primary-fire-brick
        hover:border-none
        focus:outline focus:outline-1 focus:outline-primary-madder
        focus:bg-primary-madder
        disabled:outline disabled:outline-1 disabled:outline-secondary-cadet-gray
        disabled:bg-secondary-cadet-gray
        "
      >
        {title}
        {isLoading && <Spinner />}
      </button>
    </Link>
  );
}

export default memo(ActionButton);
