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
exports.CreateUserTable1735344000000 = void 0;
const typeorm_1 = require("typeorm");
class CreateUserTable1735344000000 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: false,
                        default: 'uuid_generate_v4()',
                    },
                    { name: 'login', type: 'varchar', isUnique: true, isNullable: false },
                    { name: 'name', type: 'varchar', isNullable: false },
                    { name: 'email', type: 'varchar', isUnique: true, isNullable: false },
                    { name: 'role', type: 'varchar', isNullable: false },
                    { name: 'password', type: 'varchar', isNullable: false },
                    { name: 'isActive', type: 'boolean', default: true },
                    { name: 'lastLogin', type: 'timestamp', isNullable: true },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('user');
        });
    }
}
exports.CreateUserTable1735344000000 = CreateUserTable1735344000000;
