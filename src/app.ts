import express from "express";
import dogsRouter from "./routes/routes";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import cors from "cors";


const app = express();

app.use(cors()); // Habilita CORS para todas as origens


// Middlewares
app.use(express.json());

app.use("/api", dogsRouter);
const swaggerDocument = YAML.load("./openapi.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


export default app;
