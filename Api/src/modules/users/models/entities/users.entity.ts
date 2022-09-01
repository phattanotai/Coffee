import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enum/role.enum';

@Entity()
export class TbUsers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({ nullable: true })
  img: string;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createAt: Date;

  @Column({ type: 'timestamp', default: () => 'now()' })
  updateAt: Date;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
