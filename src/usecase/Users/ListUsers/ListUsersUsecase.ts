import { AppDataSource, createConnection } from "../../..";
import { User } from "../../../entities/User";

export class ListUsersUsecase {
  async execute(): Promise<User[]> {
    await createConnection();

    const repository = AppDataSource.getRepository(User);

    const users = await repository.find();

    return users;
  }
}