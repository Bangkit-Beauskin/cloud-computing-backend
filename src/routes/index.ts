import { Router } from "express";
import Auth from "./AuthRoutes";
import Profile from "./ProfileRoutes";
import Product from "./ProductRoutes";

const router = Router();
const routes = [
  {
    path: "/auths",
    routes: Auth,
  },
  {
    path: "/profiles",
    routes: Profile,
  },
  {
    path: "/products",
    routes: Product,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
