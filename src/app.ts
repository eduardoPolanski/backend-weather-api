import express from "express";
import weatherRoutes from "./routes/weatherRoutes";
import errorHandler from "./errors/handlerError";

import cors from "cors";

const corsOptions = {
  origin: "*",
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/weather", weatherRoutes);

app.use(errorHandler);

export default app;
