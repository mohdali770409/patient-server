import express from "express";
import {
  createEditRecoveryUpdate,
  getSingleRecoveryUpdate,
} from "../controller/recovery.controller.js";

const router = express.Router();

router.post("/createEditRecoveryUpdate", createEditRecoveryUpdate);
router.get("/getSingleRecoveryUpdate/:id", getSingleRecoveryUpdate);

export default router;
