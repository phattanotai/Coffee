import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { TbCategory } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(TbCategory)
    private cateRepository: Repository<TbCategory>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    try {
      return this.cateRepository
        .save(createCategoryDto)
        .then((savedData: any) => {
          return savedData;
        });
    } catch (error) {
      throw { message: 'CategoriesService->create ' + error.message };
    }
  }

  findAll() {
    try {
      return from(this.cateRepository.find());
    } catch (error) {
      throw { message: 'CategoriesService->findAll ' + error.message };
    }
  }

  findOne(id: number) {
    try {
      return from(this.cateRepository.findOne({ id }));
    } catch (error) {
      throw { message: 'CategoriesService->findOne ' + error.message };
    }
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      return this.cateRepository
        .update(id, updateCategoryDto)
        .then((savedData: any) => {
          return savedData;
        });
    } catch (error) {
      throw { message: 'CategoriesService->update' + error.message };
    }
  }

  remove(id: number) {
    try {
      return this.cateRepository.delete(id).then((savedData: any) => {
        return savedData.affected;
      });
    } catch (error) {
      throw { message: 'BeveragesService->remove ' + error.message };
    }
  }
}
