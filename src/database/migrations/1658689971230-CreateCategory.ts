import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCategory1658689971230 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "categories",
      columns: [
        {
          name: "id",
          type: "varchar",
          isPrimary: true
        },
        {
          name: "account_type",
          type: "varchar"
        },
        {
          name: "created_at",
          type: "timestamp",
          default: "now()"
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("categories");
  }

}
