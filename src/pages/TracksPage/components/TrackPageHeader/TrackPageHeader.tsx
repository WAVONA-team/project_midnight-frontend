import React from 'react';

import TrackPageActions from '@/pages/TracksPage/components/TrackPageHeader/TrackPageActions/TrackPageActions.tsx';
import TrackPageLogo from '@/pages/TracksPage/components/TrackPageHeader/TrackPageLogo/TrackPageLogo.tsx';

const TrackPageHeader: React.FC = React.memo(() => {
  return (
    <div className="flex justify-between sm:hidden mb-8">
      <TrackPageLogo />
      <TrackPageActions />
    </div>
  );
});

export default TrackPageHeader;
