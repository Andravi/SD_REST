import express from "express";
import dogsRouter from "./routes/routes";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app = express();

// Middlewares
app.use(express.json());

app.use("/api", dogsRouter);
const swaggerDocument = YAML.load("./openapi.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


export default app;
