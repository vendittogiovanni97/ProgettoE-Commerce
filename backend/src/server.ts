import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import expressSession from "express-session";
import connectDB from "./db/dbclient";
import addrouter from "./routes";

const port = process.env.PORT;

if (process.env.SESSION_SECRET === undefined) {
  throw new Error("Define SESSION_SECRET");
}

const app = express();
app.use(express.json());

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    },
  })
);

app.use((request, response, next) => {
  console.log(request.method, request.url);
  next();
});

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

addrouter(app);

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
  });
};

startServer();
