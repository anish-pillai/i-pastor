import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMessageTable1735344000200 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'message',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: false,
            default: 'uuid_generate_v4()',
          },
          { name: 'chatId', type: 'uuid', isNullable: false },
          { name: 'userId', type: 'uuid', isNullable: false },
          { name: 'prompt', type: 'text', isNullable: true },
          { name: 'response', type: 'text', isNullable: true },
          { name: 'totalCost', type: 'numeric', isNullable: true },
          { name: 'totalTokens', type: 'int', isNullable: true },
          { name: 'isRead', type: 'boolean', default: false },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['chatId'],
            referencedTableName: 'chat',
            referencedColumnNames: ['id'],
          },
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
    await queryRunner.dropTable('message');
  }
}
