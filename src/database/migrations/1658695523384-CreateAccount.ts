import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateAccount1658695523384 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "accounts",
      columns: [
        {
          name: "id",
          type: "varchar",
          isPrimary: true
        },
        {
          name: "user_id",
          type: "varchar"
        },
        {
          name: "category_id",
          type: "varchar"
        },
        {
          name: "balance",
          type: "integer"
        },
        {
          name: "password",
          type: "varchar"
        },
        {
          name: "created_at",
          type: "timestamp",
          default: "now()"
        },
        {
          name: "updated_at",
          type: "timestamp",
          default: "now()"
        }
      ],
      foreignKeys: [
        {
          name: "FKUser",
          referencedTableName: "users",
          referencedColumnNames: ["id"],
          columnNames: ["user_id"],
          onDelete: "SET NULL",
          onUpdate: "SET NULL"
        },
        {
          name: "FKCategory",
          referencedTableName: "categories",
          referencedColumnNames: ["id"],
          columnNames: ["category_id"],
          onDelete: "SET NULL",
          onUpdate: "SET NULL"
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("accounts");
  }

}
