import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Status } from '../enum/bills-status.enum';

export class CreateBillDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsOptional()
  duration: number;

  @IsString()
  @IsNotEmpty()
  table: string;

  @IsString()
  @IsOptional()
  status: Status;

  @IsOptional()
  createByUser: any;

  @IsOptional()
  updateByUser: any;
}
