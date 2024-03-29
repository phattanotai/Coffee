import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
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
      return this.findTableNumber(createTablesDto.number).then((findStatus) => {
        if (!findStatus) {
          return this.tablesRepository
            .save(createTablesDto)
            .then((savedData: any) => {
              return savedData;
            });
        } else {
          return {
            message: 'munber already in use',
          };
        }
      });
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
      return this.tablesRepository
        .update(id, updateTablesDto)
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

  private findTableNumber(number: string): Promise<any> {
    return this.tablesRepository
      .findOne({
        where: [{ number }],
      })
      .then((data) => {
        if (data) {
          return true;
        } else {
          return false;
        }
      });
  }
}
