import React from 'react';

import { LoginForm } from '@/modules/Authorization';

import { Container } from '@/ui/Container';
import { Logo } from '@/ui/Logo';

export const LoginPage: React.FC = React.memo(() => {
  return (
    <div
      className="
        app
        h-dvh
        bg-background-hight
        sm:h-full
        lg:bg-[url('/home_bg_desktop.webp')]
        landscape:sm:h-fit
        lg:bg-no-repeat
        lg:bg-center
        lg:bg-cover
      "
    >
<<<<<<< HEAD
      <main className="lg:grid lg:grid-cols-2 items-center">
        <Container>
=======
      <Container className="flex flex-col justify-center lg:h-screen">
        <main className="lg:grid lg:grid-cols-2 items-center">
>>>>>>> 4339e1e (fix(TEST-5): Fix reg/auth pages styles)
          <Logo className="hidden lg:flex" />
        </Container>

        <LoginForm />
      </main>
    </div>
  );
});
