import { TbBeverage } from 'src/modules/beverages/entities/beverage.entity';
import { TbBill } from 'src/modules/bills/entities/bill.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TbOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column()
  price: number;

  @Column()
  img: string;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createAt: Date;

  @Column({ type: 'timestamp', default: () => 'now()' })
  updateAt: Date;

  @ManyToOne(() => TbBeverage, (beverage) => beverage.id)
  beverage: TbBeverage;

  @ManyToOne(() => TbBill, (bill) => bill.id)
  category: TbBill;

  @BeforeUpdate()
  update() {
    this.updateAt = new Date();
  }
}
