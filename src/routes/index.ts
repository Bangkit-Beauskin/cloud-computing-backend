import { Router } from "express";
import Auth from "./AuthRoutes";
<<<<<<< HEAD
=======
import Profile from "./ProfileRoutes";
>>>>>>> staging

const router = Router();
const routes = [
  {
<<<<<<< HEAD
    path: "/auth",
    routes: Auth,
  },
=======
    path: "/auths",
    routes: Auth,
  },
  {
    path: "/profiles",
    routes: Profile,
  },
>>>>>>> staging
];

routes.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
