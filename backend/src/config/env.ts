import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || "3333",
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/desafio"
};
