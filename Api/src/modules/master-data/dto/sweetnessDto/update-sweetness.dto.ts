import { PartialType } from '@nestjs/swagger';
import { CreateSweetnessDto } from './create-sweetness.dto';

export class UpdateSweetnessDto extends PartialType(CreateSweetnessDto) {}
