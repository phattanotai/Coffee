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
      return from(this.cateRepository.save(createCategoryDto)).pipe(
        map((savedData: any) => {
          return savedData;
        }),
      );
    } catch (error) {
      throw { message: 'CategoriesService->create ' + error.message };
    }
  }

  findAll(): any {
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
      return from(this.cateRepository.update(id, updateCategoryDto)).pipe(
        map((savedData: any) => {
          return savedData;
        }),
      );
    } catch (error) {
      throw { message: 'CategoriesService->update' + error.message };
    }
  }

  remove(id: number) {
    try {
      return `This action removes a #${id} category`;
    } catch (error) {
      throw { message: 'CategoriesService->remove ' + error.message };
    }
  }
}
