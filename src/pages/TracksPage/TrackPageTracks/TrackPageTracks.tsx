import React from 'react';

const TrackPageTracks: React.FC = React.memo(() => {
  return (
    <div className="mb-28 sm:mb-12">
      <h2
        className="
          font-openSans
          font-normal
          text-2xl
          sm:text-4xl
        "
      >
        У вас пока нет добавленных треков :(
      </h2>
    </div>
  );
});

export default TrackPageTracks;
