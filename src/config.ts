import { config } from "dotenv";

config();

export default {
  PORT: process.env.PORT,
  AMAZON_URL: process.env.AMAZON_URL,
  CLIENT_URL: process.env.CLIENT_URL,
  JWT_KEY: process.env.JWT_KEY,
  LOAD_DATA_SCHEDULE: process.env.LOAD_DATA_SCHEDULE,
};
