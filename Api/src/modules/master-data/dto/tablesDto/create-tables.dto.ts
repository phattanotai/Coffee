import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateTablesDto {
  @IsString()
  @IsNotEmpty()
  @Length(0, 10)
  number: string;

  @IsOptional()
  createByUser: any;

  @IsOptional()
  updateByUser: any;
}
