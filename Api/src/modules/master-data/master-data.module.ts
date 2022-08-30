import { Module } from '@nestjs/common';
import { TypesController } from './controllers/types/types.controller';
import { SweetnessController } from './controllers/sweetness/sweetness.controller';
import { OptionsController } from './controllers/options/options.controller';
import { TablesController } from './controllers/tables/tables.controller';
import { TablesService } from './services/tables/tables.service';
import { SweetnessService } from './services/sweetness/sweetness.service';
import { TypesService } from './services/types/types.service';
import { OptionsService } from './services/options/options.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TbOptions } from './entities/options.entity';
import { TbSweetness } from './entities/sweetness.entity';
import { TbTables } from './entities/tables.entity';
import { TbTypes } from './entities/types.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TbOptions, TbSweetness, TbTables, TbTypes]),
  ],
  controllers: [
    TypesController,
    SweetnessController,
    OptionsController,
    TablesController,
  ],
  providers: [TablesService, SweetnessService, TypesService, OptionsService],
})
export class MasterDataModule {}
