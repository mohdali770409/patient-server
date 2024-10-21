import express from "express";
import patientRoutes from "./patients/routes/patient.routes.js";
const app = express();

app.use("/patients",patientRoutes);

export default app;