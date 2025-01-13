import { RouterModule, Routes } from '@nestjs/core';
import { AuthModule } from '../modules/auth/auth.module';

const routes: Routes = [
  {
    path: '/auth',
    module: AuthModule
  }
];

export const AppRoutesModule = RouterModule.register(routes);
