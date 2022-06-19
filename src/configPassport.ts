import passportJwt from "passport-jwt";
import passport from "passport";
import { Express } from "express";
import prisma from "./prisma";

const initPassport = (app: Express) => {
  app.use(passport.initialize());

  const options = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
  };

  passport.use(
    new passportJwt.Strategy(options, async function (jwtPayload, done) {
      try {
        const getUser = await prisma.user.findUnique({
          where: { id: jwtPayload.id },
        });

        if (!getUser) {
          throw new Error();
        }

        return done(null, jwtPayload);
      } catch (err) {
        return done(null, false);
      }
    })
  );
};

export default initPassport;
