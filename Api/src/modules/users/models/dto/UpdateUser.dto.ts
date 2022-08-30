import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { Role } from '../enum/role.enum';

export class UpdateUser {
  id?: number;

  @IsString()
  @IsOptional()
  @Length(0, 10)
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  imagePath?: string;

  role?: Role;
}
