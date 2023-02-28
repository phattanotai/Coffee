import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateBeverageDto } from './dto/create-beverage.dto';
import { UpdateBeverageDto } from './dto/update-beverage.dto';
import { TbBeverage } from './entities/beverage.entity';

@Injectable()
export class BeveragesService {
  constructor(
    @InjectRepository(TbBeverage)
    private beverageRepository: Repository<TbBeverage>,
  ) {}
  create(createBeverageDto: CreateBeverageDto) {
    try {
      return this.beverageRepository
        .save(createBeverageDto)
        .then((savedData: any) => {
          return savedData;
        });
    } catch (error) {
      throw { message: 'BeveragesService->create' + error.message };
    }
  }

  findAll() {
    try {
      return this.beverageRepository.find({ relations: ['category'] });
    } catch (error) {
      throw { message: 'BeveragesService->findAll ' + error.message };
    }
  }

  findOne(id: number) {
    try {
      return this.beverageRepository.findOne({ id });
    } catch (error) {
      throw { message: 'BeveragesService->findOne ' + error.message };
    }
  }

  update(id: number, updateBeverageDto: UpdateBeverageDto) {
    try {
      return this.beverageRepository
        .update(id, updateBeverageDto)
        .then((savedData: any) => {
          return savedData.affected;
        });
    } catch (error) {
      throw { message: 'BeveragesService->update ' + error.message };
    }
  }

  remove(id: number) {
    try {
      return this.beverageRepository.delete(id).then((savedData: any) => {
        return savedData.affected;
      });
    } catch (error) {
      throw { message: 'BeveragesService->remove ' + error.message };
    }
  }
}
