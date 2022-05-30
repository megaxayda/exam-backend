import { Request, Response, Router } from "express";
import get from "lodash/get";
import nedb from "../nedb";
import catchErrors from "../utils/catchErrors";

export default function createProfileRoute(router: Router) {
  router.get("/profile", catchErrors(getProfileHandler));
}

const getProfileHandler = async (req: Request, res: Response) => {
  const id = get(req, "user.id");

  nedb.findOne({ _id: id }, function (err, doc) {
    if (err) {
      return res.status(400).json({ error: err });
    }

    return res.json({
      data: {
        username: doc.username,
      },
    });
  });
};
