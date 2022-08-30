import {MigrationInterface, QueryRunner} from "typeorm";

export class createTables1661805938552 implements MigrationInterface {
    name = 'createTables1661805938552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tb_types\` DROP FOREIGN KEY \`FK_c580bd29c084955b9fdbe46dc6d\``);
        await queryRunner.query(`ALTER TABLE \`tb_types\` DROP COLUMN \`updateByUserId\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tb_types\` ADD \`updateByUserId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tb_types\` ADD CONSTRAINT \`FK_c580bd29c084955b9fdbe46dc6d\` FOREIGN KEY (\`updateByUserId\`) REFERENCES \`tb_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
