"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMessageTable1735344000200 = void 0;
const typeorm_1 = require("typeorm");
class CreateMessageTable1735344000200 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
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
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('message');
        });
    }
}
exports.CreateMessageTable1735344000200 = CreateMessageTable1735344000200;
