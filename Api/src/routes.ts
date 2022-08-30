import { Routes } from 'nest-router';
import { MasterDataModule } from './modules/master-data/master-data.module';

export const routes: Routes = [
  {
    path: '/master-data',
    module: MasterDataModule,
  },
];
