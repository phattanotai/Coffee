import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateBillDto } from './models/dto/create-bill.dto';
import { UpdateBillDto } from './models/dto/update-bill.dto';
import { TbBill } from './models/entities/bill.entity';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(TbBill)
    private billeRepository: Repository<TbBill>,
  ) {}
  create(createBillDto: CreateBillDto) {
    try {
      return this.billeRepository.save(createBillDto).then((savedData: any) => {
        return savedData;
      });
    } catch (error) {
      throw { message: 'BillsService->create' + error.message };
    }
  }

  findAll() {
    try {
      return this.billeRepository.find();
    } catch (error) {
      throw { message: 'BillsService->findAll ' + error.message };
    }
  }

  findOne(id: number) {
    try {
      return this.billeRepository.findOne({ id });
    } catch (error) {
      throw { message: 'BillsService->findOne ' + error.message };
    }
  }

  update(id: number, updateBillDto: UpdateBillDto) {
    try {
      return this.billeRepository
        .update(id, updateBillDto)
        .then((savedData: any) => {
          return savedData.affected;
        });
    } catch (error) {
      throw { message: 'BillsService->update ' + error.message };
    }
  }

  remove(id: number) {
    try {
      return `This action removes a #${id} category`;
    } catch (error) {
      throw { message: 'BillsService->remove ' + error.message };
    }
  }
}
