import dotenv from "dotenv";

dotenv.config();
const DB_ADMIN = process.env.DB_ADMIN!;
const DB_PASSWORD = process.env.DB_PASSWORD!;
const DB_CLUSTER = process.env.DB_CLUSTER!;
const DB = `mongodb+srv://${DB_ADMIN}:${DB_PASSWORD}@${DB_CLUSTER}.jjo1ygv.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT!;

const JWT_SECRET = process.env.JWT_SECRET!

export { DB, PORT, JWT_SECRET };
