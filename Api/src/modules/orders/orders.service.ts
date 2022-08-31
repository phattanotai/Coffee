import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './models/dto/create-order.dto';
import { UpdateOrderDto } from './models/dto/update-order.dto';
import { TbOrder } from './models/entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(TbOrder)
    private orderRepository: Repository<TbOrder>,
  ) {}
  create(createOrderDto: CreateOrderDto) {
    try {
      return from(this.orderRepository.save(createOrderDto)).pipe(
        map((savedData: any) => {
          return savedData;
        }),
      );
    } catch (error) {
      throw { message: 'OrdersService->create' + error.message };
    }
  }

  findAll() {
    try {
      return from(this.orderRepository.find());
    } catch (error) {
      throw { message: 'OrdersService->findAll ' + error.message };
    }
  }

  findOne(id: number) {
    try {
      return from(this.orderRepository.findOne({ id }));
    } catch (error) {
      throw { message: 'OrdersService->findOne ' + error.message };
    }
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      return from(this.orderRepository.update(id, updateOrderDto)).pipe(
        map((savedData: any) => {
          return savedData.affected;
        }),
      );
    } catch (error) {
      throw { message: 'OrdersService->update ' + error.message };
    }
  }

  remove(id: number) {
    try {
      return `This action removes a #${id} category`;
    } catch (error) {
      throw { message: 'OrdersService->remove ' + error.message };
    }
  }
}
