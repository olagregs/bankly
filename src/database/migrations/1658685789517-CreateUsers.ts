import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsers1658685789517 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "users",
      columns: [
        {
          name: "id",
          type: "varchar",
          isPrimary: true
        },
        {
          name: "cpf",
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
    await queryRunner.dropTable("users");
  }

}
