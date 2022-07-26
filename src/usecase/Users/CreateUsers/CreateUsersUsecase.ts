import { hash } from 'bcryptjs';

import { AppDataSource, createConnection } from "../../..";
import { User } from "../../../entities/User";

interface ICreateUser {
  name: string;
  cpf: string;
}

export class CreateUsersUsecase {
  async execute({ name, cpf }: ICreateUser): Promise<User> {
    await createConnection();

    const repository = AppDataSource.getRepository(User);

    const userAlreadyExists = await repository.findOne({
      where: { cpf }
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const user = repository.create({
      name,
      cpf
    });

    await repository.save(user);

    return user;
  }
}