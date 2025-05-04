import express, { Application, Request, Response } from "express";
import cors from "cors";
import connectDB from "./mongoConnect";
import helmet from "helmet";
import router from "./routes/appRouter";
const app: Application = express();
const PORT = 5000;

app.use(express.json());
//connect to DB
connectDB();

//middleware for cors
app.use(cors());
//middleware for cors
app.use(helmet());
app.use(
  "/api/",
  (req: Request, res: Response, next) => {
    console.log("api users route hit");
    next();
  },
  router
);

//
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
