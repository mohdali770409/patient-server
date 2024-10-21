import express from "express";
import { addNewPatient } from "../controller/patients.controller.js";

const router = express.Router();

router.post("/addNewPatient",addNewPatient);

export default router;


