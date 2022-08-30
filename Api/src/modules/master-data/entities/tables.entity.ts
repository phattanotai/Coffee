import { TbUsers } from 'src/modules/users/models/entities/users.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TbTables {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createAt: Date;

  @Column({ type: 'timestamp', default: () => 'now()' })
  updateAt: Date;

  @ManyToOne(() => TbUsers, (user) => user.id)
  createByUser: TbUsers;

  @ManyToOne(() => TbUsers, (user) => user.id)
  updateByUser: TbUsers;

  @BeforeUpdate()
  update() {
    this.updateAt = new Date();
  }
}
