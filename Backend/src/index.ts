import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { configDotenv } from "dotenv";
configDotenv();

import { ENV } from "./ENV";
import AuthRouter from "./routes/auth";
import path from "path";

const PORT = ENV.PORT;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use(AuthRouter);

app.use("/", express.static(path.join(process.cwd(), "../Frontend/dist")));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
