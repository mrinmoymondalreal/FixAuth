import { Pool } from "pg";
import { ENV } from "./ENV";

const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 5000,
});

export default pool;
