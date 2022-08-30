import {MigrationInterface, QueryRunner} from "typeorm";

export class createTables1661804769125 implements MigrationInterface {
    name = 'createTables1661804769125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tb_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('user', 'admin') NOT NULL DEFAULT 'user', \`imagePath\` varchar(255) NULL, UNIQUE INDEX \`IDX_142ce3112f446974f1c96a5d3f\` (\`email\`), UNIQUE INDEX \`IDX_4402e5176d3d51b228b3466d07\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tb_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updateAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`createByUserId\` int NULL, \`updateByUserId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tb_beverage\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`duration\` int NOT NULL, \`price\` int NOT NULL, \`img\` varchar(255) NOT NULL, \`createAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updateAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`createByUserId\` int NULL, \`updateByUserId\` int NULL, \`categoryId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tb_tables\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`duration\` int NOT NULL, \`price\` int NOT NULL, \`createAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updateAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`createByUserId\` int NULL, \`updateByUserId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tb_bill\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`amount\` int NOT NULL, \`status\` varchar(255) NOT NULL, \`createAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updateAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updateByUserId\` int NULL, \`tableId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tb_options\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updateAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`createByUserId\` int NULL, \`updateByUserId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tb_sweetness\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updateAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`createByUserId\` int NULL, \`updateByUserId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tb_types\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updateAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`createByUserId\` int NULL, \`updateByUserId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tb_order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`duration\` int NOT NULL, \`price\` int NOT NULL, \`img\` varchar(255) NOT NULL, \`createAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updateAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`beverageId\` int NULL, \`categoryId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tb_category\` ADD CONSTRAINT \`FK_1dc1b4ebd9ef65af80d1137facc\` FOREIGN KEY (\`createByUserId\`) REFERENCES \`tb_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tb_category\` ADD CONSTRAINT \`FK_95488a0ab41762017caa1df3ab8\` FOREIGN KEY (\`updateByUserId\`) REFERENCES \`tb_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tb_beverage\` ADD CONSTRAINT \`FK_c9277545cce8145850f88770a81\` FOREIGN KEY (\`createByUserId\`) REFERENCES \`tb_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tb_beverage\` ADD CONSTRAINT \`FK_70b49417fef9c6464c39cef013a\` FOREIGN KEY (\`updateByUserId\`) REFERENCES \`tb_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tb_beverage\` ADD CONSTRAINT \`FK_f16989e896155c5ba5743459a69\` FOREIGN KEY (\`categoryId\`) REFERENCES \`tb_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tb_tables\` ADD CONSTRAINT \`FK_ce77ecf1286326c2059296593cc\` FOREIGN KEY (\`createByUserId\`) REFERENCES \`tb_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tb_tables\` ADD CONSTRAINT \`FK_a5f6b63697cf29a5459b3a2df2f\` FOREIGN KEY (\`updateByUserId\`) REFERENCES \`tb_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tb_bill\` ADD CONSTRAINT \`FK_c38d5ff0317a94b83662d2f673e\` FOREIGN KEY (\`updateByUserId\`) REFERENCES \`tb_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tb_bill\` ADD CONSTRAINT \`FK_b0736bde77a791d8398b86925d4\` FOREIGN KEY (\`tableId\`) REFERENCES \`tb_tables\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tb_options\` ADD CONSTRAINT \`FK_945fda62e4ff74f6b7ee3dd8db6\` FOREIGN KEY (\`createByUserId\`) REFERENCES \`tb_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tb_options\` ADD CONSTRAINT \`FK_0f20867e2eef1db40571a8f68a3\` FOREIGN KEY (\`updateByUserId\`) REFERENCES \`tb_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tb_sweetness\` ADD CONSTRAINT \`FK_1fddc0ebd5bcbf46f0e33db0010\` FOREIGN KEY (\`createByUserId\`) REFERENCES \`tb_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tb_sweetness\` ADD CONSTRAINT \`FK_c3bcdfc7e37202908e7fc470ecc\` FOREIGN KEY (\`updateByUserId\`) REFERENCES \`tb_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tb_types\` ADD CONSTRAINT \`FK_a879ae44a47eb0fb505bd1b3fca\` FOREIGN KEY (\`createByUserId\`) REFERENCES \`tb_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tb_types\` ADD CONSTRAINT \`FK_c580bd29c084955b9fdbe46dc6d\` FOREIGN KEY (\`updateByUserId\`) REFERENCES \`tb_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tb_order\` ADD CONSTRAINT \`FK_adc9489233a9d064a073e2d4881\` FOREIGN KEY (\`beverageId\`) REFERENCES \`tb_beverage\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tb_order\` ADD CONSTRAINT \`FK_a3e54622aad6a0b8156f28c883c\` FOREIGN KEY (\`categoryId\`) REFERENCES \`tb_bill\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tb_order\` DROP FOREIGN KEY \`FK_a3e54622aad6a0b8156f28c883c\``);
        await queryRunner.query(`ALTER TABLE \`tb_order\` DROP FOREIGN KEY \`FK_adc9489233a9d064a073e2d4881\``);
        await queryRunner.query(`ALTER TABLE \`tb_types\` DROP FOREIGN KEY \`FK_c580bd29c084955b9fdbe46dc6d\``);
        await queryRunner.query(`ALTER TABLE \`tb_types\` DROP FOREIGN KEY \`FK_a879ae44a47eb0fb505bd1b3fca\``);
        await queryRunner.query(`ALTER TABLE \`tb_sweetness\` DROP FOREIGN KEY \`FK_c3bcdfc7e37202908e7fc470ecc\``);
        await queryRunner.query(`ALTER TABLE \`tb_sweetness\` DROP FOREIGN KEY \`FK_1fddc0ebd5bcbf46f0e33db0010\``);
        await queryRunner.query(`ALTER TABLE \`tb_options\` DROP FOREIGN KEY \`FK_0f20867e2eef1db40571a8f68a3\``);
        await queryRunner.query(`ALTER TABLE \`tb_options\` DROP FOREIGN KEY \`FK_945fda62e4ff74f6b7ee3dd8db6\``);
        await queryRunner.query(`ALTER TABLE \`tb_bill\` DROP FOREIGN KEY \`FK_b0736bde77a791d8398b86925d4\``);
        await queryRunner.query(`ALTER TABLE \`tb_bill\` DROP FOREIGN KEY \`FK_c38d5ff0317a94b83662d2f673e\``);
        await queryRunner.query(`ALTER TABLE \`tb_tables\` DROP FOREIGN KEY \`FK_a5f6b63697cf29a5459b3a2df2f\``);
        await queryRunner.query(`ALTER TABLE \`tb_tables\` DROP FOREIGN KEY \`FK_ce77ecf1286326c2059296593cc\``);
        await queryRunner.query(`ALTER TABLE \`tb_beverage\` DROP FOREIGN KEY \`FK_f16989e896155c5ba5743459a69\``);
        await queryRunner.query(`ALTER TABLE \`tb_beverage\` DROP FOREIGN KEY \`FK_70b49417fef9c6464c39cef013a\``);
        await queryRunner.query(`ALTER TABLE \`tb_beverage\` DROP FOREIGN KEY \`FK_c9277545cce8145850f88770a81\``);
        await queryRunner.query(`ALTER TABLE \`tb_category\` DROP FOREIGN KEY \`FK_95488a0ab41762017caa1df3ab8\``);
        await queryRunner.query(`ALTER TABLE \`tb_category\` DROP FOREIGN KEY \`FK_1dc1b4ebd9ef65af80d1137facc\``);
        await queryRunner.query(`DROP TABLE \`tb_order\``);
        await queryRunner.query(`DROP TABLE \`tb_types\``);
        await queryRunner.query(`DROP TABLE \`tb_sweetness\``);
        await queryRunner.query(`DROP TABLE \`tb_options\``);
        await queryRunner.query(`DROP TABLE \`tb_bill\``);
        await queryRunner.query(`DROP TABLE \`tb_tables\``);
        await queryRunner.query(`DROP TABLE \`tb_beverage\``);
        await queryRunner.query(`DROP TABLE \`tb_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_4402e5176d3d51b228b3466d07\` ON \`tb_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_142ce3112f446974f1c96a5d3f\` ON \`tb_users\``);
        await queryRunner.query(`DROP TABLE \`tb_users\``);
    }

}
