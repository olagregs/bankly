import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "./entities/User";
import { Category } from "./entities/Category";
import { Account } from "./entities/Account";
import { CreateUsers1658685789517 } from "./database/migrations/1658685789517-CreateUsers";
import { CreateCategory1658689971230 } from "./database/migrations/1658689971230-CreateCategory";
import { CreateAccount1658695523384 } from "./database/migrations/1658695523384-CreateAccount";
import { Statement } from "./entities/Statement";
import { CreateStatement1658701894009 } from "./database/migrations/1658701894009-CreateStatement";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "bankly",
  password: "bankly_test",
  database: "db",
  synchronize: true,
  logging: false,
  entities: [
    User,
    Category,
    Account,
    Statement
  ],
  migrations: [
    CreateUsers1658685789517,
    CreateCategory1658689971230,
    CreateAccount1658695523384,
    CreateStatement1658701894009
  ],
});

export async function createConnection(host = "db") {
  AppDataSource.setOptions({ host });

  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();

    return AppDataSource;
  }
}