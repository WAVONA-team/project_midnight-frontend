import React from 'react';
import toast from 'react-hot-toast';

import { NotificationMessage } from '@/ui/NotificationMessage';

// import { Link } from 'react-router-dom';
import arrowIcon from '../../../../../public/arrows/arrowIcon.svg';

type Props = {
  id: string;
  name: string;
  count: number;
  image: string;
};

export const PlaylistCard: React.FC<Props> = React.memo(
  ({ name, count, image }) => {
    const getCorrectSuffix = (number: number) => {
      const rules = new Intl.PluralRules('ru', {
        type: 'cardinal',
      });

      const suffixes = {
        zero: 'ов',
        one: '',
        two: 'а',
        few: 'а',
        other: 'ов',
        many: 'ов',
      };

      const suffix = suffixes[rules.select(number)];

      return `трек${suffix}`;
    };

    const devToast = () =>
      toast.custom(() => (
        <NotificationMessage message="Страница плейлиста находится в разработке" />
      ));

    return (
      <button
        // to={`/playlists/${id}`}
        type="button"
        className="text-on-primary-anti-flash-white w-full flex md:flex-col items-center md:items-start gap-4 hover:text-on-primary-anti-flash-white"
        onClick={devToast}
      >
        <img
          src={image}
          alt="playlist thumbnail"
          className="rounded-lg w-16 h-16 md:w-full md:h-full"
        />

        <div className="md:mt-4 flex justify-between items-center w-full">
          <div className="flex flex-col gap-2">
            <h3 className="text-left font-rubik font-normal text-base md:font-semibold">
              {name}
            </h3>

            <p className="text-left font-rubik font-normal text-sm text-on-secondary-dim-gray md:text-on-primary-anti-flash-white">
              {`${count} ${getCorrectSuffix(count)}`}
            </p>
          </div>

          <img
            className="
              px-1.5
              ml-2
              rotate-180
              md:hidden
            "
            src={arrowIcon}
            alt="Arrow Icon"
          />
        </div>
      </button>
    );
  },
);
