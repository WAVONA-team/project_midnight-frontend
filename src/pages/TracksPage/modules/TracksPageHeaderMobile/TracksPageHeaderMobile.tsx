import React from 'react';

import TrackPageActions from '@/pages/TracksPage/modules/TrackPageHeader/components/TrackPageActions/TrackPageActions.tsx';

import { Logo } from '@/ui/Logo';

const TracksPageHeaderMobile: React.FC = React.memo(() => {
  return (
    <div className="pt-6 flex justify-between">
      <Logo textSize="text-lg" logoWidth="w-6" />

      <TrackPageActions />
    </div>
  );
});

export default TracksPageHeaderMobile;
