import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TbOrder } from './models/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TbOrder])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
