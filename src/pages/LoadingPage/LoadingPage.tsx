import React from 'react';

import { Spinner } from '@/ui/Spinner';

export const LoadingPage: React.FC = React.memo(() => {
  return (
    <div
      className="
        h-screen
        w-screen
        bg-background-hight
      "
    >
      <div
        className="flex
        h-full
        relative
        after:content-['']
        after:block
        after:absolute
        after:w-full
        after:h-full
        after:bg-gradient-to-br
        after:from-primary-fire-brick
        after:opacity-20
        after:z-10 items-center justify-center"
      >
        <Spinner className="mr-5" width="w-12" height="h-12" />

        <p className="font-rubik font-semibold text-on-primary-lavender-blush text-base">
          Подождите, идет загрузка
        </p>
      </div>
    </div>
  );
});
