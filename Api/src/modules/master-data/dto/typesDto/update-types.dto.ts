import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTypesDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsNumber()
  @IsOptional()
  duration: number;

  @IsOptional()
  updateByUser: any;
}
