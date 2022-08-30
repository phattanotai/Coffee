import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateBeverageDto } from './dto/create-beverage.dto';
import { UpdateBeverageDto } from './dto/update-beverage.dto';
import { TbBeverage } from './entities/beverage.entity';

@Injectable()
export class BeveragesService {
  @InjectRepository(TbBeverage)
  private beverageRepository: Repository<TbBeverage>;
  create(createBeverageDto: CreateBeverageDto) {
    try {
      return from(this.beverageRepository.save(createBeverageDto)).pipe(
        map((savedData: any) => {
          return savedData;
        }),
      );
    } catch (error) {
      throw { message: 'BeveragesService->create' + error.message };
    }
  }

  findAll() {
    try {
      return from(this.beverageRepository.find());
    } catch (error) {
      throw { message: 'BeveragesService->findAll ' + error.message };
    }
  }

  findOne(id: number) {
    try {
      return from(this.beverageRepository.findOne({ id }));
    } catch (error) {
      throw { message: 'BeveragesService->findOne ' + error.message };
    }
  }

  update(id: number, updateBeverageDto: UpdateBeverageDto) {
    try {
      return from(this.beverageRepository.update(id, updateBeverageDto)).pipe(
        map((savedData: any) => {
          return savedData;
        }),
      );
    } catch (error) {
      throw { message: 'BeveragesService->update ' + error.message };
    }
  }

  remove(id: number) {
    try {
      return `This action removes a #${id} category`;
    } catch (error) {
      throw { message: 'BeveragesService->remove ' + error.message };
    }
  }
}
