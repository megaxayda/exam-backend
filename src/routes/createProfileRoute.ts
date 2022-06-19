import { Request, Response, Router } from "express";
import get from "lodash/get";
import prisma from "../prisma";
import catchErrors from "../utils/catchErrors";

export default function createProfileRoute(router: Router) {
  router.get("/profile", catchErrors(getProfileHandler));
}

const getProfileHandler = async (req: Request, res: Response) => {
  const id = get(req, "user.id");

  const getUser = await prisma.user.findUnique({
    where: { id },
  });

  return res.json({ data: getUser });
};
