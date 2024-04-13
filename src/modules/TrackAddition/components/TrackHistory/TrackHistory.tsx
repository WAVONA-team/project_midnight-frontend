import React, { useState, useEffect } from 'react';

import { useStore } from '@/store';
import { Track } from 'project_midnight';

import { TrackInfo } from '@/components/TrackInfo/TrackInfo';

export const TrackHistory: React.FC = React.memo(() => {
  const [searchHistory, setSearchHistory] = useState<Track[]>([]);
  const { getSearchHistory, user } = useStore(({ getSearchHistory, user }) => ({
    getSearchHistory,
    user,
  }));

  useEffect(() => {
    getSearchHistory(user!.id)
      .then(res => setSearchHistory(res));
  }, []);

  return (
    <div>
      <p className="font-notoSans text-on-primary-anti-flash-white">
        История Поиска
      </p>
      <div>
        {searchHistory.map((track) => (
          <button>
            <TrackInfo
              key={track.id}
              name={track.title}
              artist={track.author}
              provider={track.source}
              duration={track.duration}
            />
          </button>
        ))}
      </div>
    </div>
  );
});

export default TrackHistory;
