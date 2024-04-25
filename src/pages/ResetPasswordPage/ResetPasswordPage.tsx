import React from 'react';

import { ResetPasswordForm } from '@/modules/Authorization';

import { Container } from '@/ui/Container';
import { Logo } from '@/ui/Logo';

export const ResetPasswordPage: React.FC = React.memo(() => {
  return (
    <div
      className="
    app
    h-screen
    bg-background-hight
    lg:bg-[url('/home_bg_desktop.webp')]
    lg:bg-no-repeat
    lg:bg-center
    lg:bg-cover
  "
    >
      <Container className="h-full flex flex-col justify-center">
        <main className="lg:grid lg:grid-cols-2 items-center">
          <Logo className="hidden lg:flex" />
          <ResetPasswordForm />
        </main>
      </Container>
    </div>
  );
});
