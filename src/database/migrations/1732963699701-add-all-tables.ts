import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAllTables1732963699701 implements MigrationInterface {
    name = 'AddAllTables1732963699701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Модель автомобиля" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brandId" uuid NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "UQ_3a44fbe74d018c3bf3fe517587f" UNIQUE ("name"), CONSTRAINT "PK_cafe029115bdde24888be9942c5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Средняя цена" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "region" character varying(100) NOT NULL, "brandId" uuid NOT NULL, "modelId" uuid NOT NULL, "averagePrice" numeric(10,2) NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ac9d92d254df55b8e0262e6f470" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Марка автомобиля" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "UQ_c204d0cdba4ee6f9a673cac63a1" UNIQUE ("name"), CONSTRAINT "PK_3f8cc9b09650d5d7593a4d36d01" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Статистика просмотров" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "listingId" uuid NOT NULL, "viewsDaily" integer NOT NULL DEFAULT '0', "viewsWeekly" integer NOT NULL DEFAULT '0', "viewsMonthly" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_fab6bc54017f1e413c8c800d14b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."Объявление_currency_enum" AS ENUM('USD', 'EUR', 'UAH')`);
        await queryRunner.query(`CREATE TYPE "public"."Объявление_status_enum" AS ENUM('active', 'inactive', 'moderation')`);
        await queryRunner.query(`CREATE TABLE "Объявление" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "brandId" uuid NOT NULL, "modelId" uuid NOT NULL, "price" numeric NOT NULL, "currency" "public"."Объявление_currency_enum" NOT NULL, "originalCurrency" character varying NOT NULL, "exchangeRate" numeric NOT NULL, "status" "public"."Объявление_status_enum" NOT NULL, "editAttempts" integer NOT NULL DEFAULT '0', "description" text NOT NULL, CONSTRAINT "PK_871ca32c7f35611c455e27f2da0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Разрешение" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_868e51401d84f98e08d24e5511a" UNIQUE ("name"), CONSTRAINT "PK_dbaba54f0ff7a33f9a9a3b1c541" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Разрешения роли" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "permissionId" uuid NOT NULL, "roleId" uuid NOT NULL, CONSTRAINT "PK_214b57a98ac8bf650757a49b019" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Роли" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_0458e1df6025ad049e042ad9f2c" UNIQUE ("name"), CONSTRAINT "PK_63e026ea2354222f562680cd8d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."Пользователи_accounttype_enum" AS ENUM('basic', 'premium')`);
        await queryRunner.query(`CREATE TABLE "Пользователи" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "region" character varying(255), "accountType" "public"."Пользователи_accounttype_enum" NOT NULL DEFAULT 'basic', "roleId" uuid NOT NULL, CONSTRAINT "UQ_1d60459a86cce0f868b093341a7" UNIQUE ("email"), CONSTRAINT "PK_5587f2807f61974f20e80c0c065" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Модель автомобиля" ADD CONSTRAINT "FK_23a21f97c4ca793303d59541b46" FOREIGN KEY ("brandId") REFERENCES "Марка автомобиля"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Средняя цена" ADD CONSTRAINT "FK_a5aa560c0e01c339f6fa975cd4f" FOREIGN KEY ("brandId") REFERENCES "Марка автомобиля"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Средняя цена" ADD CONSTRAINT "FK_a0efed04e891535440c24257acb" FOREIGN KEY ("modelId") REFERENCES "Модель автомобиля"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Статистика просмотров" ADD CONSTRAINT "FK_ab21d08febf8f97a8401829bd58" FOREIGN KEY ("listingId") REFERENCES "Объявление"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Объявление" ADD CONSTRAINT "FK_c994b70f7ea7ec2acb769c40043" FOREIGN KEY ("userId") REFERENCES "Пользователи"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Объявление" ADD CONSTRAINT "FK_3fc7dda8cfdd8e096a3093dbb75" FOREIGN KEY ("brandId") REFERENCES "Марка автомобиля"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Объявление" ADD CONSTRAINT "FK_9c7616a340c27cb534e5c2c34e6" FOREIGN KEY ("modelId") REFERENCES "Модель автомобиля"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Разрешения роли" ADD CONSTRAINT "FK_ad12ef747d1d367cdd057e7882b" FOREIGN KEY ("roleId") REFERENCES "Роли"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Разрешения роли" ADD CONSTRAINT "FK_ee290b57bbc8b9db2e9bdc36853" FOREIGN KEY ("permissionId") REFERENCES "Разрешение"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Пользователи" ADD CONSTRAINT "FK_6e40236e53d1de580c098936fd4" FOREIGN KEY ("roleId") REFERENCES "Роли"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Пользователи" DROP CONSTRAINT "FK_6e40236e53d1de580c098936fd4"`);
        await queryRunner.query(`ALTER TABLE "Разрешения роли" DROP CONSTRAINT "FK_ee290b57bbc8b9db2e9bdc36853"`);
        await queryRunner.query(`ALTER TABLE "Разрешения роли" DROP CONSTRAINT "FK_ad12ef747d1d367cdd057e7882b"`);
        await queryRunner.query(`ALTER TABLE "Объявление" DROP CONSTRAINT "FK_9c7616a340c27cb534e5c2c34e6"`);
        await queryRunner.query(`ALTER TABLE "Объявление" DROP CONSTRAINT "FK_3fc7dda8cfdd8e096a3093dbb75"`);
        await queryRunner.query(`ALTER TABLE "Объявление" DROP CONSTRAINT "FK_c994b70f7ea7ec2acb769c40043"`);
        await queryRunner.query(`ALTER TABLE "Статистика просмотров" DROP CONSTRAINT "FK_ab21d08febf8f97a8401829bd58"`);
        await queryRunner.query(`ALTER TABLE "Средняя цена" DROP CONSTRAINT "FK_a0efed04e891535440c24257acb"`);
        await queryRunner.query(`ALTER TABLE "Средняя цена" DROP CONSTRAINT "FK_a5aa560c0e01c339f6fa975cd4f"`);
        await queryRunner.query(`ALTER TABLE "Модель автомобиля" DROP CONSTRAINT "FK_23a21f97c4ca793303d59541b46"`);
        await queryRunner.query(`DROP TABLE "Пользователи"`);
        await queryRunner.query(`DROP TYPE "public"."Пользователи_accounttype_enum"`);
        await queryRunner.query(`DROP TABLE "Роли"`);
        await queryRunner.query(`DROP TABLE "Разрешения роли"`);
        await queryRunner.query(`DROP TABLE "Разрешение"`);
        await queryRunner.query(`DROP TABLE "Объявление"`);
        await queryRunner.query(`DROP TYPE "public"."Объявление_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."Объявление_currency_enum"`);
        await queryRunner.query(`DROP TABLE "Статистика просмотров"`);
        await queryRunner.query(`DROP TABLE "Марка автомобиля"`);
        await queryRunner.query(`DROP TABLE "Средняя цена"`);
        await queryRunner.query(`DROP TABLE "Модель автомобиля"`);
    }

}
