import { Router } from "express";
import passport from "passport";
import createAuthenticateRoute from "./createAuthenticateRoute";
import createProfileRoute from "./createProfileRoute";
import createHealthRoute from "./createHealthRoute";

function createRoutes(rootRouter: Router): void {
  // URL path "/api"
  createAuthenticateRoute(rootRouter);
  createHealthRoute(rootRouter);

  const protectedRouter = Router();
  // URL path "/api/protected"
  rootRouter.use(
    "/protected",
    passport.authenticate("jwt", { session: false }),
    protectedRouter
  );

  createProfileRoute(protectedRouter);
}

export default createRoutes;
