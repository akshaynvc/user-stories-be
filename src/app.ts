import express, { ErrorRequestHandler } from "express";
import createHttpError from "http-errors";
import getRouter from "./routes/user.route";
import mongoose from "mongoose";
import { DB, PORT } from "./config";
import errorHandler from "./middleware/errorHandler";
import morgan from "morgan";
import cors from 'cors'

const app = express();
app.use(morgan('dev'))
app.use(express.json())
app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use("/api", getRouter);


app.use(() => {
  throw createHttpError(404, "Route not found");
});

app.use(errorHandler);

mongoose.connect(DB).then(()=>{
    console.log('Connected to db')
    app.listen(PORT, () => {
        console.log(`app is running at ${PORT}`);
      });
}).catch(()=>{
    throw createHttpError(501, "DB not found");
})


