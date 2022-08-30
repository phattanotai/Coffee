import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateTypesDto {
  @IsString()
  @IsNotEmpty()
  @Length(0, 10)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsOptional()
  createByUser: any;

  @IsOptional()
  updateByUser: any;
}
