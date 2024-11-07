import express from "express";
import { getAllPatients,addEditPatientBasicDetails,getPatientDetailsById,deletePatient, addEditPatientAdvancedDetails, addEditPatientOngoingTreatment } from "../controller/patients.controller.js";

const router = express.Router();
// /api/v1/patients/addEditPatientBasicDetails
router.post("/addEditPatientBasicDetails",addEditPatientBasicDetails);

// /api/v1/patients/addEditPatientAdvancedDetails
router.post("/addEditPatientAdvancedDetails",addEditPatientAdvancedDetails);

// /api/v1/patients/getPatientsDetails
router.get("/getAllPatients",getAllPatients);

// /api/v1/patients/getPatientsDetails
router.get("/getPatientDetailsById/:id",getPatientDetailsById);

// /api/v1/patients/deletePatient
router.post('/deletePatient',deletePatient);

// /api/v1/patients/addEditPatientOngoingTreatment
router.post("/addEditPatientOngoingTreatment", addEditPatientOngoingTreatment);

export default router;


