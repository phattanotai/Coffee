import { TbBeverage } from 'src/modules/beverages/entities/beverage.entity';
import { TbBill } from 'src/modules/bills/models/entities/bill.entity';
import { TbUsers } from 'src/modules/users/models/entities/users.entity';

import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from '../enum/orders-status.enum';

@Entity()
export class TbOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  duration: number;

  @Column()
  price: number;

  @Column()
  sweetness: string;

  @Column()
  type: string;

  @Column()
  option: string;

  @Column()
  total: number;

  @Column({ type: 'enum', enum: Status, default: Status.WAITING })
  status: Status;

  @ManyToOne(() => TbBeverage, (beverage) => beverage.id)
  beverage: TbBeverage;

  @ManyToOne(() => TbBill, (bill) => bill.id)
  bill: TbBill;

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
