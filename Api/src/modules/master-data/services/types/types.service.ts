import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateTypesDto } from '../../dto/typesDto/create-types.dto';
import { UpdateTypesDto } from '../../dto/typesDto/update-types.dto';
import { TbTypes } from '../../entities/types.entity';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(TbTypes)
    private typesRepository: Repository<TbTypes>,
  ) {}

  create(createTypesDto: CreateTypesDto) {
    try {
      return from(this.typesRepository.save(createTypesDto)).pipe(
        map((savedData: any) => {
          return savedData;
        }),
      );
    } catch (error) {
      throw { message: 'OptionsService->create ' + error.message };
    }
  }

  findAll() {
    try {
      return from(this.typesRepository.find());
    } catch (error) {
      throw { message: 'OptionsService->findAll ' + error.message };
    }
  }

  findOne(id: number) {
    try {
      return from(this.typesRepository.findOne({ id }));
    } catch (error) {
      throw { message: 'OptionsService->findOne ' + error.message };
    }
  }

  update(id: number, updateTypesDto: UpdateTypesDto) {
    try {
      return from(this.typesRepository.update(id, updateTypesDto)).pipe(
        map((savedData: any) => {
          return savedData.affected;
        }),
      );
    } catch (error) {
      throw { message: 'OptionsService->update ' + error.message };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} masterDatum`;
  }
}
