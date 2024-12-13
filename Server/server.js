import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnecttion } from "./dbConnection.js";
import cookieParser from "cookie-parser";
import routes from "./routes/routes.js";
// import { authentication } from "./middleware/authMiddleware.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT","PATCH", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", routes);

app.listen(PORT, () => {
  dbConnecttion();
  console.log(`Server Started At Port:${PORT}`);
});
