import { PartialType } from '@nestjs/swagger';
import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { CreateBeverageDto } from './create-beverage.dto';

export class UpdateBeverageDto extends PartialType(CreateBeverageDto) {
  @IsString()
  @IsOptional()
  @Length(0, 50)
  name: string;

  @IsNumber()
  @IsOptional()
  duration: number;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  img: string;

  @IsObject()
  @IsOptional()
  category: any;
}
