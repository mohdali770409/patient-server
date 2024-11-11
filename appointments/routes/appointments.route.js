import express from "express";
import {
  addEditAppointment,
  getUpcomingAppointments,
  getPastAppointments,
  deleteAppointment,
} from "../controller/appointments.controller.js";

const router = express.Router();

// /api/v1/appointments/addEditAppointment
router.post("/addEditAppointment", addEditAppointment);

// /api/v1/appointments/getUpcomingAppointments
router.get("/getUpcomingAppointments", getUpcomingAppointments);

// /api/v1/appointments/getPastAppointments
router.get("/getPastAppointments", getPastAppointments);

// /api/v1/appointments/deleteAppointment
router.post("/deleteAppointment", deleteAppointment);

export default router;
