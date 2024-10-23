import express from "express";
import { getAllPatients,addEditPatientBasicDetails,getPatientDetailsById } from "../controller/patients.controller.js";

const router = express.Router();
// /api/v1/patients/addEditPatientBasicDetails
router.post("/addEditPatientBasicDetails",addEditPatientBasicDetails);

// /api/v1/patients/getPatientsDetails
router.get("/getAllPatients",getAllPatients);

// /api/v1/patients/getPatientsDetails
router.get("/getPatientDetailsById/:id",getPatientDetailsById);

export default router;


