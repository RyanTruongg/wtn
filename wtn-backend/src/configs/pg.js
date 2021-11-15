import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: process.env.NODE_ENV === "test" ? "wtn" : process.env.POSTGRES_USER,
  host: process.env.NODE_ENV === "test" ? "localhost" : process.env.POSTGRES_SERVER,
  database: process.env.NODE_ENV === "test" ? "wtn" : process.env.POSTGRES_DB,
  password: process.env.NODE_ENV === "test" ? "wtn123" : process.env.POSTGRES_PASSWORD,
  port: process.env.NODE_ENV === "test" ? 5432 : parseInt(process.env.POSTGRES_PORT, 10),
});

export default pool;
