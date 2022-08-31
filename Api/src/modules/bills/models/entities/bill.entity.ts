import { TbUsers } from 'src/modules/users/models/entities/users.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from '../enum/bills-status.enum';

@Entity()
export class TbBill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  duration: number;

  @Column()
  table: string;

  @Column({ type: 'enum', enum: Status, default: Status.WAITING })
  status: Status;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createAt: Date;

  @Column({ type: 'timestamp', default: () => 'now()' })
  updateAt: Date;

  @ManyToOne(() => TbUsers, (user) => user.id)
  updateByUser: TbUsers;

  @BeforeUpdate()
  update() {
    this.updateAt = new Date();
  }
}
