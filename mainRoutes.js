import express from "express";
import patientRoutes from "./patients/routes/patient.routes.js";
const app = express();
// /api/v1/patients 
app.use("/patients",patientRoutes);

export default app;