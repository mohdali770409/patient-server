import express from "express";
import patientRoutes from "./patients/routes/patient.routes.js";
import appointmentRoutes from "./appointments/routes/appointments.route.js";
const app = express();

// /api/v1/patients
app.use("/patients", patientRoutes);

// /api/v1/appointments
app.use("/appointments", appointmentRoutes);
export default app;
