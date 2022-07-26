import { Router } from 'express';
import { CreateUsersController } from '../usecase/Users/CreateUsers/CreateUsersController';
import { ListUsersController } from '../usecase/Users/ListUsers/ListUsersController';

const usersRoutes = Router();

usersRoutes.post("", new CreateUsersController().handle);
usersRoutes.get("/list", new ListUsersController().handle);

export { usersRoutes }