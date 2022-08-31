import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TbBill } from './models/entities/bill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TbBill])],
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
