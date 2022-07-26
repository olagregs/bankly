import { Router } from 'express';
import { CreateCategoriesController } from '../usecase/Categories/CreateCategories/CreateCategoriesController';
import { ListCategoriesController } from '../usecase/Categories/ListCategories/ListCategoriesController';

const categoriesRoutes = Router();

categoriesRoutes.post("", new CreateCategoriesController().handle);
categoriesRoutes.get("/list", new ListCategoriesController().handle);

export { categoriesRoutes }