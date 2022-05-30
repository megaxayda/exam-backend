import passportJwt from "passport-jwt";
import passport from "passport";
import { Express } from "express";
import nedb from "./nedb";

const initPassport = (app: Express) => {
  app.use(passport.initialize());

  const options = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
  };

  passport.use(
    new passportJwt.Strategy(options, async function (jwtPayload, done) {
      console.log(jwtPayload.id);
      try {
        nedb.findOne({ _id: jwtPayload.id }, function (err, doc) {
          if (!doc) {
            return done(null, false);
          }
          return done(null, jwtPayload);
        });
      } catch (err) {
        return done(null, false);
      }
    })
  );
};

export default initPassport;
