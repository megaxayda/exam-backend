import { Request, Response, NextFunction } from "express";
import chalk from "chalk";

function catchErrors(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next).catch((err: Error) => {
      const trackId = new Date().toString();
      console.group();
      console.error(chalk.red("START: " + trackId));
      console.error(err);
      console.error(chalk.red("END: " + trackId));
      console.groupEnd();
      return res.status(500).json({ msg: "internal error" });
    });
  };
}

export default catchErrors;
