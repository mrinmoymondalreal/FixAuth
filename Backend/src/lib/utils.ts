import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../ENV";
import pool from "../database";

export async function user(req: Request, res: Response, next: NextFunction) {
  if (!req.cookies)
    return res.status(401).send("Unauthorized") as unknown as void;
  const { tkn, ptkn } = req.cookies;
  console.log(!tkn || !ptkn);
  if (!tkn || !ptkn)
    return res.status(401).send("Unauthorized") as unknown as void;

  try {
    const obj = jwt.verify(tkn, ENV.JWT_TOKEN!);
    res.locals.user = obj;
    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      const { rows } = await pool.query(
        "SELECT tkn FROM tokens WHERE token = $1",
        [ptkn]
      );
      if (rows.length == 0)
        return res.status(401).send("Unauthorized") as unknown as void;
      const { tkn } = rows[0] as { tkn: string };
      const new_tkn = jwt.sign(jwt.decode(tkn)!, ENV.JWT_TOKEN!, {
        expiresIn: "1h",
      });
      res.setHeader("set-cookie", [
        `tkn=${new_tkn};HttpOnly;SameSite=Strict;Secure`,
      ]);
      return next();
    }
    console.log(err);
    return res.status(404).send("Unauthorized") as unknown as void;
  }
}
