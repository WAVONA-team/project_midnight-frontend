import React from 'react';

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
        md:bg-[url('/src/assets/home_bg_desktop.webp')]
        bg-no-repeat
        bg-center
        bg-cover
        pb-12
        md:pt-12
        flex
        flex-col-reverse
        md:flex-col
      "
    >
      <Container className="grid grid-rows-[auto] gap-y-10">
        <header className="row-start-2 md:row-start-1 md:flex md:justify-end">
          <MainButtonLink path="/login" title="Войти" className="md:w-min" />
        </header>

        <main
          className="
            row-start-1
            row-end-2
            flex
            flex-col
            gap-8
            md:row-start-2
            md:grid
            md:grid-cols-2
            md:mt-60
          "
        >
          <Logo />

          <h1 className="font-openSans text-on-primary-anti-flash-white text-4xl lg:text-6xl">
            Слушайте треки со всех площадок в одном месте
          </h1>
        </main>
      </Container>
    </div>
  );
});
