import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from '../enum/orders-status.enum';

export class CreateOrderDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  status: Status;

  @IsObject()
  @IsNotEmpty()
  beverage: any;

  @IsObject()
  @IsNotEmpty()
  bill: any;

  @IsOptional()
  createByUser: any;

  @IsOptional()
  updateByUser: any;
}
