import { TbUsers } from 'src/modules/users/models/entities/users.entity';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addUsers1661766545118 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const usersTb = queryRunner.connection.getRepository(TbUsers);

    await usersTb.insert([
      {
        username: 'admin',
        password:
          '$2b$12$7uwBXHtz5sX8Z1pCb/JyEuUC3O8lnl1UTicPKbpegB658rcfmm6pS',
        name: 'admin',
        email: 'admin@gamil.com',
        img: 'image',
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
