import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateSweetnessDto {
  @IsString()
  @IsNotEmpty()
  @Length(0, 10)
  name: string;

  @IsOptional()
  createByUser: any;

  @IsOptional()
  updateByUser: any;
}
