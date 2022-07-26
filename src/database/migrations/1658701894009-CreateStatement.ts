import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateStatement1658701894009 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "statements",
      columns: [
        {
          name: "id",
          type: "varchar",
          isPrimary: true
        },
        {
          name: "operation",
          type: "varchar"
        },
        {
          name: "description",
          type: "varchar"
        },
        {
          name: "amount",
          type: "integer"
        },
        {
          name: "account_id",
          type: "varchar"
        },
        {
          name: "status",
          type: "varchar"
        },
        {
          name: "created_at",
          type: "timestamp",
          default: "now()"
        }
      ],
      foreignKeys: [
        {
          name: "FKAccount",
          referencedTableName: "accounts",
          referencedColumnNames: ["id"],
          columnNames: ["account_id"],
          onDelete: "SET NULL",
          onUpdate: "SET NULL"
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("statements");
  }

}
