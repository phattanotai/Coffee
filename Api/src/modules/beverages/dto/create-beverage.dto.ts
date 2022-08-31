import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateBeverageDto {
  @IsString()
  @IsNotEmpty()
  @Length(0, 50)
  name: string;

  @IsNotEmpty()
  duration: number;

  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  img: string;

  @IsObject()
  @IsNotEmpty()
  category: any;

  @IsOptional()
  createByUser: any;

  @IsOptional()
  updateByUser: any;
}
