import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateOptionsDto } from '../../dto/optionsDto/create-options.dto';
import { UpdateOptionsDto } from '../../dto/optionsDto/update-options.dto';
import { TbOptions } from '../../entities/options.entity';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(TbOptions)
    private optionsRepository: Repository<TbOptions>,
  ) {}

  create(createOptionsDto: CreateOptionsDto) {
    try {
      return this.optionsRepository
        .save(createOptionsDto)
        .then((savedData: any) => {
          return savedData;
        });
    } catch (error) {
      throw { message: 'OptionsService->create ' + error.message };
    }
  }

  findAll() {
    try {
      return from(this.optionsRepository.find());
    } catch (error) {
      throw { message: 'OptionsService->findAll ' + error.message };
    }
  }

  findOne(id: number) {
    try {
      return from(this.optionsRepository.findOne({ id }));
    } catch (error) {
      throw { message: 'OptionsService->findOne ' + error.message };
    }
  }

  update(id: number, updateOptionsDto: UpdateOptionsDto) {
    try {
      return this.optionsRepository
        .update(id, updateOptionsDto)
        .then((savedData: any) => {
          return savedData.affected;
        });
    } catch (error) {
      throw { message: 'OptionsService->update ' + error.message };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} masterDatum`;
  }
}
