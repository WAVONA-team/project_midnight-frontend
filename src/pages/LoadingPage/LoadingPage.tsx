import React from 'react';

import { Spinner } from '@/ui/Spinner';

export const LoadingPage: React.FC = React.memo(() => {
  return (
    <div
      className="
        h-screen
        w-screen
        bg-background-hight
        relative
        after:content-['']
        after:block
        after:absolute
        after:w-full
        after:h-full
        after:bg-gradient-to-br
        after:from-primary-fire-brick
        after:opacity-20
        after:z-10
      "
    >
      <Spinner
        width="w-12"
        height="h-12"
        thicknessWidth="w-9"
        thicknessHeight="h-9"
      />

      <p className="block w-full text-center absolute z-20 top-1/2 left-1/2 -translate-x-1/2 translate-y-12 font-rubik font-semibold text-on-primary-lavender-blush text-base">
        Подождите, идет загрузка
      </p>
    </div>
  );
});
