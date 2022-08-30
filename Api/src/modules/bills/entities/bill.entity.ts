import { TbTables } from 'src/modules/master-data/entities/tables.entity';
import { TbUsers } from 'src/modules/users/models/entities/users.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TbBill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  amount: number;

  @Column()
  status: string;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createAt: Date;

  @Column({ type: 'timestamp', default: () => 'now()' })
  updateAt: Date;

  @ManyToOne(() => TbUsers, (user) => user.id)
  updateByUser: TbUsers;

  @ManyToOne(() => TbTables, (table) => table.id)
  table: TbTables;

  @BeforeUpdate()
  update() {
    this.updateAt = new Date();
  }
}
