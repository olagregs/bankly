import { Router } from 'express';
import { AuthenticateUserController } from '../usecase/Authenticate/AuthenticateUserController';

const authenticateRoutes = Router();

authenticateRoutes.post("", new AuthenticateUserController().handle);


export { authenticateRoutes };