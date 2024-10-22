import express from "express";
import { addEditPatientBasicDetails } from "../controller/patients.controller.js";

const router = express.Router();
// /api/v1/patients/addEditPatientBasicDetails
router.post("/addEditPatientBasicDetails",addEditPatientBasicDetails);

export default router;


