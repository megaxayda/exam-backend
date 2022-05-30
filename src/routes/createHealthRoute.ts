import { Request, Response, Router } from "express";
import catchErrors from "../utils/catchErrors";
import { SUCCESS } from "../utils/constants";

export default function createProfileRoute(router: Router) {
  router.get("/health", catchErrors(getHealthHandler));
}

const getHealthHandler = async (req: Request, res: Response) => {
  return res.json({ message: SUCCESS });
};
