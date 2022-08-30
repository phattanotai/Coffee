import { PartialType } from '@nestjs/swagger';
import { CreateTablesDto } from './create-tables.dto';

export class UpdateTablesDto extends PartialType(CreateTablesDto) {}
