import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from 'src/modules/users/models/enum/role.enum';
import { ApiProperty } from '@nestjs/swagger';

// https://www.npmjs.com/package/class-validator

export class LoginUser {
  @ApiProperty({
    description: 'username',
    minimum: 5,
    maximum: 50,
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  @Length(5, 50)
  @MinLength(5, {
    message: 'Username is too short',
  })
  @MaxLength(50, {
    message: 'Username is too long',
  })
  username: string;

  //
  @ApiProperty({
    description: 'password',
    minimum: 8,
    maximum: 50,
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 50)
  @MinLength(8, {
    message: 'Password is too short',
  })
  @MaxLength(50, {
    message: 'Password is too long',
  })
  password: string;
}

export class ResponseLoginUser {
  @ApiProperty({
    description: 'accessToken for access api',
    type: 'string',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiUGFrcG9vbSIsInBhc3N3b3JkIjoic2Rmc2Rmc2RmZiJ9LCJpYXQiOjE2NTQxNTMwMjksImV4cCI6MTY1NDE2MzAyOX0._H30KY06wQhvvDsxQdTwl-VndujPB8T7_MfIq-zsfCo',
  })
  @IsString()
  accessToken: string;

  @ApiProperty({
    description: 'userData',
    type: 'object',
    properties: {
      username: {
        type: 'string',
        example: 'Pakpoom',
      },
      password: {
        type: 'string',
        example: 'testtttttt',
      },
    },
  })
  userData: any;
}

export class RegisterUser extends LoginUser {
  id?: number;

  @IsString()
  @IsNotEmpty()
  @Length(0, 10)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(0, 10)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  imagePath?: string;

  role?: Role;
}

export class userLoginHistoryBody {
  @IsOptional()
  id: number;

  @IsString()
  @IsOptional()
  @Length(0, 10)
  name: string;

  @IsString()
  @IsOptional()
  @Length(0, 10)
  username: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  @IsString()
  role?: Role;
}
