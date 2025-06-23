import express from "express";
import dogsRouter from "./routes/routes";

const app = express();

// Middlewares
app.use(express.json());

app.use("/api", dogsRouter);


export default app;
