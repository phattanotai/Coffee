import { PartialType } from '@nestjs/swagger';
import { CreateOptionsDto } from './create-options.dto';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateOptionsDto extends PartialType(CreateOptionsDto) {}
