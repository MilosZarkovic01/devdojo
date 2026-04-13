import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddIsActiveColumn1776087097236 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('user', new TableColumn({
            name: 'is_active',
            type: 'boolean',
            isNullable: false,
            default: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("user", "is_active");
    }

}
