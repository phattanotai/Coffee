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
      return this.orderRepository
        .save(createOrderDto)
        .then((savedData: any) => {
          return savedData;
        });
    } catch (error) {
      throw { message: 'OrdersService->create' + error.message };
    }
  }

  createAll(createOrderDto: CreateOrderDto[]) {
    try {
      return this.orderRepository
        .save(createOrderDto)
        .then((savedData: any) => {
          return savedData;
        });
    } catch (error) {
      throw { message: 'OrdersService->create' + error.message };
    }
  }

  findAll() {
    try {
      return this.orderRepository.find({ relations: ['bill', 'beverage'] });
    } catch (error) {
      throw { message: 'OrdersService->findAll ' + error.message };
    }
  }

  find(param: any) {
    try {
      return this.orderRepository.find(param);
    } catch (error) {
      throw { message: 'OrdersService->findAll ' + error.message };
    }
  }

  findOne(id: number) {
    try {
      return this.orderRepository.findOne({ id });
    } catch (error) {
      throw { message: 'OrdersService->findOne ' + error.message };
    }
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      return this.orderRepository
        .update(id, updateOrderDto)
        .then((savedData: any) => {
          return savedData.affected;
        });
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
