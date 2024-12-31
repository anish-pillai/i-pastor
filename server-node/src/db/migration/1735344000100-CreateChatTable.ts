import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateChatTable1735344000100 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'chat',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: false,
            default: 'uuid_generate_v4()',
          },
          { name: 'userId', type: 'uuid', isNullable: false },
          { name: 'topic', type: 'varchar', isNullable: true },
          { name: 'isActive', type: 'boolean', default: true },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['userId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('chat');
  }
}
