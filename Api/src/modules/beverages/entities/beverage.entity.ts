import { TbCategory } from 'src/modules/categories/entities/category.entity';
import { TbUsers } from 'src/modules/users/models/entities/users.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TbBeverage {
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

  @ManyToOne(() => TbUsers, (user) => user.id)
  createByUser: TbUsers;

  @ManyToOne(() => TbUsers, (user) => user.id)
  updateByUser: TbUsers;

  @ManyToOne(() => TbCategory, (category) => category.id)
  category: TbCategory;

  @BeforeUpdate()
  update() {
    this.updateAt = new Date();
  }
}
