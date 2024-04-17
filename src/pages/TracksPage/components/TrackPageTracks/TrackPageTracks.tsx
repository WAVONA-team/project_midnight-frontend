import React from 'react';

const TrackPageTracks: React.FC = React.memo(() => {
  return (
    <div className="mb-28 sm:mb-12">
      <h2
        className="
          font-rubik
          font-semibold
          text-secondary-cadet-gray
          text-2xl
          sm:text-2xl
          lg:text-xl
          tracking-wide
        "
      >
        У вас пока нет добавленных треков :(
      </h2>
    </div>
  );
});

export default TrackPageTracks;
