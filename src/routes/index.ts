import { Router } from "express";
import Auth from "./AuthRoutes";

const router = Router();
const routes = [
  {
    path: "/auth",
    routes: Auth,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
