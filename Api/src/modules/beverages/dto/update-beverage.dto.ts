import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { CreateBeverageDto } from './create-beverage.dto';

export class UpdateBeverageDto extends PartialType(CreateBeverageDto) {}
