import React from 'react';

import TrackPageActions from '@/pages/TracksPage/components/TrackPageHeader/components/TrackPageActions/TrackPageActions.tsx';

import { Logo } from '@/ui/Logo';

type Props = {
  handler: () => void;
};

const TracksPageHeaderMobile: React.FC<Props> = React.memo(({ handler }) => {
  return (
    <div className="lg:hidden flex justify-between">
      <Logo />
      <TrackPageActions handler={handler} />
    </div>
  );
});

export default TracksPageHeaderMobile;
