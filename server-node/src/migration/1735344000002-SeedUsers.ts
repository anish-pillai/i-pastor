import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsers1735344000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS "user";
    `);
    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" SERIAL NOT NULL,
        "login" character varying NOT NULL,
        "name" character varying NOT NULL,
        "email" character varying NOT NULL,
        "role" character varying NOT NULL,
        "password" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
      );
    `);
    await queryRunner.query(`
      INSERT INTO "user" (login, name, email, role, password, "createdAt", "updatedAt") VALUES
      ('alice123', 'Alice', 'alice@mailsac.com', 'user', 'password' ,CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('bob123', 'Bob', 'bob@mailsac.com', 'admin', 'password' ,CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('charlie123', 'Charlie', 'charlie@mailsac.com', 'user', 'password' ,CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "user" WHERE login IN ('alice123', 'bob123', 'charlie123');
    `);
  }
}
