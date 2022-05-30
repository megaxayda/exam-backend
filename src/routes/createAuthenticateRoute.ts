import bcrypt from "bcrypt";
import { Request, Response, Router } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import nedb from "../nedb";
import catchErrors from "../utils/catchErrors";
import { SALT_ROUNDS, SUCCESS } from "../utils/constants";
import validate from "../utils/validate";

const usernameValidator = body("username").isString().isLength({ min: 1 });
const passwordValidator = body("password").isString().isLength({ min: 1 });

function createAuthenticateRoute(router: Router) {
  router.post(
    "/login",
    usernameValidator,
    passwordValidator,
    validate,
    catchErrors(loginHandler)
  );
  router.post(
    "/register",
    usernameValidator,
    passwordValidator,
    validate,
    catchErrors(registerHandler)
  );
}

async function loginHandler(req: Request, res: Response) {
  const body = req.body;

  nedb.findOne({ username: body.username }, async function (err, doc) {
    if (!doc) {
      return res.status(400).send({ msg: "Wrong username or password" });
    }

    const passCorrect = await bcrypt.compare(body.password, doc.password);
    if (!passCorrect) {
      return res.status(400).json({ msg: "Wrong username or password" });
    }

    const token = jwt.sign(
      {
        id: doc._id,
        email: doc.email,
      },
      process.env.SECRET || String(Math.random() * 1000000),
      { expiresIn: "30d" }
    );

    return res.json({ token });
  });
}

async function registerHandler(req: Request, res: Response) {
  const body = req.body;

  const hash = await bcrypt.hash(body.password, SALT_ROUNDS);

  nedb.insert(
    {
      username: body.username,
      password: hash,
    },
    function (err, doc) {
      if (err) {
        return res.json({ error: err });
      }

      return res.json({ message: SUCCESS });
    }
  );
}

export default createAuthenticateRoute;
