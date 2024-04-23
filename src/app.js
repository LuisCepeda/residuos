import express from "express";
import wasteRoutes from "./routes/wastes.routes.js";

const app = express();
app.use(express.json());
app.use(wasteRoutes);

export default app;
