import express from "express";
import patientRoutes from "./patients/routes/patient.routes.js";
import appointmentRoutes from "./appointments/routes/appointments.route.js";
import userRoutes from "./auth/user/routes/user.routes.js";
import recoveryRoutes from "./recovery-story-board/routes/recovery.routes.js"
const app = express();

// /api/v1/patients
app.use("/patients", patientRoutes);

// /api/v1/appointments
app.use("/appointments", appointmentRoutes);

// /api/v1/auth
app.use("/auth", userRoutes);

app.use("/recovery",recoveryRoutes)
export default app;
