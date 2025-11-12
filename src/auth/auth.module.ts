import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const expiresIn = parseInt(configService.get<string>('JWT_EXPIRATION') || '3600', 10);

        return {
          secret: configService.get<string>('JWT_CONSTANT'),
          signOptions: { expiresIn },
        };
      },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // makes AuthGuard global, need "@Public()" before endpoint to be accessible without token
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
