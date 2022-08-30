import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateSweetnessDto } from '../../dto/sweetnessDto/create-sweetness.dto';
import { UpdateSweetnessDto } from '../../dto/sweetnessDto/update-sweetness.dto';
import { TbSweetness } from '../../entities/sweetness.entity';

@Injectable()
export class SweetnessService {
  constructor(
    @InjectRepository(TbSweetness)
    private sweetnessRepository: Repository<TbSweetness>,
  ) {}

  create(createSweetnessDto: CreateSweetnessDto) {
    try {
      return from(this.sweetnessRepository.save(createSweetnessDto)).pipe(
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
      return from(this.sweetnessRepository.find());
    } catch (error) {
      throw { message: 'OptionsService->findAll ' + error.message };
    }
  }

  findOne(id: number) {
    try {
      return from(this.sweetnessRepository.findOne({ id }));
    } catch (error) {
      throw { message: 'OptionsService->findOne ' + error.message };
    }
  }

  update(id: number, updateSweetnessDto: UpdateSweetnessDto) {
    try {
      return from(this.sweetnessRepository.update(id, updateSweetnessDto)).pipe(
        map((savedData: any) => {
          return savedData;
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
