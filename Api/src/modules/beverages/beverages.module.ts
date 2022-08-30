import { Module } from '@nestjs/common';
import { BeveragesService } from './beverages.service';
import { BeveragesController } from './beverages.controller';
import { TbBeverage } from './entities/beverage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TbBeverage])],
  controllers: [BeveragesController],
  providers: [BeveragesService],
})
export class BeveragesModule {}
