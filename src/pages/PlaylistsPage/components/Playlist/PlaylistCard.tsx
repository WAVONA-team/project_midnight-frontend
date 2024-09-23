import React from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

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
    type SupportedLanguages = 'ru' | 'uk' | 'pl' | 'en';

    const { t, i18n } = useTranslation('translation', {
      keyPrefix: 'playlistCard',
    });

    const getCorrectSuffix = (number: number) => {
      const currentLanguage = i18n.language as SupportedLanguages;
      const pluralRules = new Intl.PluralRules(currentLanguage, {
        type: 'cardinal',
      });

      const suffixes: Record<SupportedLanguages, Record<string, string>> = {
        ru: {
          zero: 'ов',
          one: '',
          two: 'а',
          few: 'а',
          other: 'ов',
          many: 'ов',
        },
        uk: {
          zero: 'ів',
          one: '',
          two: 'и',
          few: 'и',
          other: 'ів',
          many: 'ів',
        },
        pl: {
          one: '',
          few: 'y',
          many: 'ów',
          other: 'ów',
        },
        en: {
          one: '',
          other: 's',
        },
      };

      const langSuffixes = suffixes[currentLanguage] || suffixes.en;
      const suffix = langSuffixes[pluralRules.select(number)];

      return `${t('track')}${suffix}`;
    };

    const devToast = () =>
      toast.custom(() => <NotificationMessage message={t('inProgress')} />);

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
