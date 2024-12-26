import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsers1634567890123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "user" (name, role) VALUES
      ('Alice', 'admin'),
      ('Bob', 'user'),
      ('Charlie', 'guest');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "user" WHERE name IN ('Alice', 'Bob', 'Charlie');
    `);
  }
}
