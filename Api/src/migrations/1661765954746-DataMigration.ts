import {MigrationInterface, QueryRunner} from "typeorm";

export class DataMigration1661765954746 implements MigrationInterface {
    name = 'DataMigration1661765954746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tb_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('user', 'admin') NOT NULL DEFAULT 'user', \`imagePath\` varchar(255) NULL, UNIQUE INDEX \`IDX_142ce3112f446974f1c96a5d3f\` (\`email\`), UNIQUE INDEX \`IDX_4402e5176d3d51b228b3466d07\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_4402e5176d3d51b228b3466d07\` ON \`tb_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_142ce3112f446974f1c96a5d3f\` ON \`tb_users\``);
        await queryRunner.query(`DROP TABLE \`tb_users\``);
    }

}
