import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TbUsers } from '../users/models/entities/users.entity';
import { HashService } from '../users/services/hash/hash.service';
import { UsersService } from '../users/services/users/users.service';
import { AuthController } from './controllers/auth/auth.controller';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '10000s' },
      }),
    }),
    TypeOrmModule.forFeature([TbUsers]),
  ],
  providers: [JwtStrategy, JwtAuthGuard, RolesGuard, UsersService, HashService],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
