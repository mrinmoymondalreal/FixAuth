import { Router } from "express";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import { ENV } from "../ENV";
import pool from "../database";
import { user } from "../lib/utils";

const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).send("Invalid Request") as unknown as void;

  const { rows: resp } = await pool.query(
    "SELECT password, id, name, email FROM users WHERE username = $1",
    [username]
  );

  if (resp.length == 0)
    return res.status(401).send("Invalid Credentials") as unknown as void;

  const { password: hashPassword, ...obj } = resp[0] as {
    password: string;
    id: number;
    name: string;
    email: string;
  };

  const isTrue = await bcrypt.compare(password, hashPassword);

  if (!isTrue)
    return res.status(401).send("Invalid Credentials") as unknown as void;

  const tknObj = { username, ...obj };

  const permanentTkn = crypto.randomUUID();
  const tkn = jwt.sign({ ...tknObj }, ENV.JWT_TOKEN!, { expiresIn: "1h" });

  await pool.query("INSERT INTO tokens (token, tkn) VALUES ($1, $2)", [
    permanentTkn,
    tkn,
  ]);

  res.setHeader("set-cookie", [
    `tkn=${tkn};HttpOnly;SameSite=Strict;Secure`,
    `ptkn=${permanentTkn};HttpOnly;SameSite=Strict;Secure`,
  ]);

  res.send("ok");
});

router.post("/register", async (req, res) => {
  const { username, password, name, email } = req.body;

  if (!username || !password || !name || !email)
    return res.status(400).send("Invalid Request") as unknown as void;

  const { rows: resp } = await pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );

  if (resp.length != 0)
    return res.status(400).send("User Already Exists") as unknown as void;

  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users (username, password, name, email) VALUES ($1, $2, $3, $4)",
    [username.toLowerCase(), hash, name, email]
  );

  res.send("ok");
});

router.get("/profile", user, async (req, res) => {
  res.send(res.locals.user);
});

router.get("/profile", user, async (req, res) => {
  res.clearCookie("tkn");
  res.clearCookie("ptkn");

  res.send("ok");
});

export default router;
