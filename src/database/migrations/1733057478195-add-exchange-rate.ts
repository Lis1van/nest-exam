import { MigrationInterface, QueryRunner } from "typeorm";

export class AddExchangeRate1733057478195 implements MigrationInterface {
    name = 'AddExchangeRate1733057478195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Пользователи" ALTER COLUMN "accountType" SET DEFAULT 'basic'`);
        await queryRunner.query(`ALTER TABLE "Объявление" DROP COLUMN "priceInCurrency"`);
        await queryRunner.query(`ALTER TABLE "Объявление" ADD "priceInCurrency" numeric`);
        await queryRunner.query(`ALTER TABLE "Объявление" DROP COLUMN "priceInOriginalCurrency"`);
        await queryRunner.query(`ALTER TABLE "Объявление" ADD "priceInOriginalCurrency" numeric`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Объявление" DROP COLUMN "priceInOriginalCurrency"`);
        await queryRunner.query(`ALTER TABLE "Объявление" ADD "priceInOriginalCurrency" double precision`);
        await queryRunner.query(`ALTER TABLE "Объявление" DROP COLUMN "priceInCurrency"`);
        await queryRunner.query(`ALTER TABLE "Объявление" ADD "priceInCurrency" double precision`);
        await queryRunner.query(`ALTER TABLE "Пользователи" ALTER COLUMN "accountType" SET DEFAULT 'basic'Пользователи_accounttype_enum"`);
    }

}
