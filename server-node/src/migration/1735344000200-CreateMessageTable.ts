import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMessageTable1735344000100 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'message',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'prompt',
            type: 'text',
          },
          {
            name: 'response',
            type: 'text',
          },
          {
            name: 'totalCost',
            type: 'float',
            default: 0,
          },
          {
            name: 'totalTokens',
            type: 'int',
            default: 0,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'chatId',
            type: 'int',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['userId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['chatId'],
            referencedTableName: 'chat',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('message');
  }
}
