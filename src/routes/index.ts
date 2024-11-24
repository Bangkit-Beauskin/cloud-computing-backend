import { Router } from "express";
import Auth from "./AuthRoutes";
import Profile from "./ProfileRoutes";

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
];

routes.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
