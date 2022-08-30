import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateTablesDto } from '../../dto/tablesDto/create-tables.dto';
import { UpdateTablesDto } from '../../dto/tablesDto/update-tables.dto';
import { TbTables } from '../../entities/tables.entity';

@Injectable()
export class TablesService {
  constructor(
    @InjectRepository(TbTables)
    private tablesRepository: Repository<TbTables>,
  ) {}

  create(createTablesDto: CreateTablesDto) {
    try {
      return from(this.tablesRepository.save(createTablesDto)).pipe(
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
      return from(this.tablesRepository.find());
    } catch (error) {
      throw { message: 'OptionsService->findAll ' + error.message };
    }
  }

  findOne(id: number) {
    try {
      return from(this.tablesRepository.findOne({ id }));
    } catch (error) {
      throw { message: 'OptionsService->findOne ' + error.message };
    }
  }

  update(id: number, updateTablesDto: UpdateTablesDto) {
    try {
      return from(this.tablesRepository.update(id, updateTablesDto)).pipe(
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
