import { config } from "dotenv";

config();

export default {
  PORT: process.env.PORT,
  AMAZON_URL: process.env.AMAZON_URL,
};
