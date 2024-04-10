import React, { useState } from 'react';

import { useStore } from '@/store';
import { Track } from 'project_midnight';

import { TrackInfo } from '@/components/TrackInfo/TrackInfo';

export const TrackHistory: React.FC = React.memo(() => {
  const [searchHistory, setSearchHistory] = useState<Track[]>([]);
  const { getSearchHistory, user } = useStore(({ getSearchHistory, user }) => ({
    getSearchHistory,
    user,
  }));

  const getSearchHistoryFunction = async () => {
    const history = await getSearchHistory(user!.id);
    setSearchHistory(history);
  };
  getSearchHistoryFunction();
  return (
    <div>
      <p className="font-notoSans text-on-primary-anti-flash-white">
        История Поиска
      </p>
      <div>
        {searchHistory.map((track, index) => (
          <TrackInfo
            key={index}
            name={track.title}
            artist={track.author}
            provider={track.source}
            duration={track.duration}
          />
        ))}
      </div>
    </div>
  );
});

export default TrackHistory;
