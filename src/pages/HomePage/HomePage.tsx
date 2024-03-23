import React from 'react';

import { ExtendedPlayer } from '@/modules/Player/components/ExtentedPlayer/ExtendedPlayer';

import { MainButtonLink } from '@/ui/Button';
import { Container } from '@/ui/Container';
import { Logo } from '@/ui/Logo';

export const HomePage: React.FC = React.memo(() => {
  return (
    <div
      className="
        app
        h-screen
        bg-[url('/src/assets/home_bg_mobile.webp')]
        lg:bg-[url('/src/assets/home_bg_desktop.webp')]
        bg-no-repeat
        bg-center
        bg-cover
        pb-12
        lg:pt-12
        flex
        flex-col-reverse
        lg:flex-col
      "
    >
      <Container className="grid grid-rows-[auto] gap-y-10">
        <header className="row-start-2 lg:row-start-1 lg:flex lg:justify-end">
          <MainButtonLink path="/login" title="Войти" className="lg:w-min" />
        </header>

        <main
          className="
            row-start-1
            row-end-2
            flex
            flex-col
            gap-8
            lg:row-start-2
            lg:grid
            lg:grid-cols-2
            lg:mt-60
          "
        >
          <Logo />

          <h1 className="font-openSans text-on-primary-anti-flash-white text-4xl lg:text-6xl">
            Слушайте треки со всех площадок в одном месте
          </h1>

          <ExtendedPlayer
            tracks={['https://www.youtube.com/watch?v=95d2uohF0CQ']}
          />
        </main>
      </Container>
    </div>
  );
});
