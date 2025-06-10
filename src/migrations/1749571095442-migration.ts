import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749571095442 implements MigrationInterface {
    name = 'Migration1749571095442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`pin_code\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(255) NOT NULL, \`status\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ut_selection\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`profileImg\` varchar(255) NULL, \`major\` varchar(255) NULL, \`hobby\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`agenda\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`info\` varchar(255) NOT NULL, \`time\` varchar(255) NOT NULL, \`current\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`admin\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vote_log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`pinCodeId\` int NULL, \`maleId\` int NULL, \`femaleId\` int NULL, UNIQUE INDEX \`REL_7d5ec74fcf0b38a7f4913040f9\` (\`pinCodeId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`vote_log\` ADD CONSTRAINT \`FK_7d5ec74fcf0b38a7f4913040f94\` FOREIGN KEY (\`pinCodeId\`) REFERENCES \`pin_code\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vote_log\` ADD CONSTRAINT \`FK_9b61cb887a797c72549c141d365\` FOREIGN KEY (\`maleId\`) REFERENCES \`ut_selection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vote_log\` ADD CONSTRAINT \`FK_86b2363d58e6c1dd551336c21b6\` FOREIGN KEY (\`femaleId\`) REFERENCES \`ut_selection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vote_log\` DROP FOREIGN KEY \`FK_86b2363d58e6c1dd551336c21b6\``);
        await queryRunner.query(`ALTER TABLE \`vote_log\` DROP FOREIGN KEY \`FK_9b61cb887a797c72549c141d365\``);
        await queryRunner.query(`ALTER TABLE \`vote_log\` DROP FOREIGN KEY \`FK_7d5ec74fcf0b38a7f4913040f94\``);
        await queryRunner.query(`DROP INDEX \`REL_7d5ec74fcf0b38a7f4913040f9\` ON \`vote_log\``);
        await queryRunner.query(`DROP TABLE \`vote_log\``);
        await queryRunner.query(`DROP TABLE \`admin\``);
        await queryRunner.query(`DROP TABLE \`agenda\``);
        await queryRunner.query(`DROP TABLE \`ut_selection\``);
        await queryRunner.query(`DROP TABLE \`pin_code\``);
    }

}
