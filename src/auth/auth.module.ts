import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { ProfileController } from './profile.controller';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from '../roles/roles.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'schedula-dev-secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController, ProfileController],
  providers: [AuthService, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}
