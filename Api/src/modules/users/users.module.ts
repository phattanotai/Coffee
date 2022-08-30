import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { UserController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TbUsers } from './models/entities/users.entity';
import { AuthModule } from 'src/modules/auth/auth.module';
import { HashService } from './services/hash/hash.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('EXPIRESIN') },
      }),
    }),
    TypeOrmModule.forFeature([TbUsers]),
    AuthModule,
  ],
  providers: [UsersService, HashService],
  controllers: [UserController],
  exports: [UsersService, HashService],
})
export class UsersModule {}
