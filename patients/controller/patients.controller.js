import Patient from "../model/patient.model.js";
import mongoose from "mongoose";

export const addEditPatientBasicDetails = async (req, res) => {
  try {
    const {
      id,
      registrationNumber,
      firstName,
      lastName,
      phone,
      email,
      religion,
      age,
      gender,
      street,
      locality,
      city,
      state,
      pinCode,
      symptomsAndDiseases
    } = req.body;

    // Check if patient already exists
    let patient;
    if (id) {
      const objectId = mongoose.Types.ObjectId.createFromHexString(id);
      patient = await Patient.findOne({ _id: objectId });
    }

    if (patient) {
      // Update existing patient
      patient.firstName = firstName;
      patient.lastName = lastName;
      patient.phone = phone;
      patient.email = email;
      patient.religion = religion;
      patient.age = age;
      patient.gender = gender;
      patient.street = street;
      patient.locality = locality;
      patient.city = city;
      patient.state = state;
      patient.pinCode = pinCode;
      patient.symptomsAndDiseases = symptomsAndDiseases;
      patient.isDeleted = false;
      patient.isActive = true;

      await patient.save();

      return res
        .status(200)
        .json({ message: "Patient updated successfully", patient });
    } else {
      // Create new patient
      const newPatient = new Patient({
        registrationNumber,
        firstName,
        lastName,
        phone,
        email,
        religion,
        age,
        gender,
        street,
        locality,
        city,
        state,
        pinCode,
        symptomsAndDiseases,
        isDeleted: false,
        isActive: true,
      });

      await newPatient.save();

      return res
        .status(201)
        .json({ message: "Patient added successfully", patient: newPatient });
    }
  } catch (error) {
    console.error("Error adding/editing patient:", error);
    res
      .status(500)
      .json({ message: "Error adding/editing patient", error: error.message });
  }
};

export const addEditPatientAdvancedDetails = async (req, res) => {
  try {
    const {
      id,
      medicalHistory,
      majorDiseases,
      provisionalDiagnosis,
      differentialDiagnosis,
      finalDiagnosis,
      vitalSigns,
      pilccod,
      additionalHistory,
      localExamination,
      systemicExamination,
      otherSystemicExamination,
      treatmentsAtPreviousHospital,
      chiefComplaint,
      investigations
    } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Patient ID is required" });
    }

    const objectId = mongoose.Types.ObjectId.createFromHexString(id);
    const patient = await Patient.findById(objectId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Update medical history fields
    if (medicalHistory) {
      patient.medicalHistory = {
        ...patient.medicalHistory,
        ...medicalHistory
      };
    }

    // Rest of your existing updates...
    if (majorDiseases) patient.majorDiseases = majorDiseases;
    if (provisionalDiagnosis) patient.provisionalDiagnosis = provisionalDiagnosis;
    if (differentialDiagnosis) patient.differentialDiagnosis = differentialDiagnosis;
    if (finalDiagnosis) patient.finalDiagnosis = finalDiagnosis;

    // Add new chief complaint
    if (chiefComplaint) {
      patient.chiefComplaint.push({
        complaint: chiefComplaint?.complaint,
        date:chiefComplaint?.date ? chiefComplaint?.date : new Date()
      });
    }

    // Add new vital signs
    if (vitalSigns) {
      patient.vitalSigns.push({
        ...vitalSigns,
      });
    }

    // Add new PILCCOD entry
    if (pilccod) {
      patient.pilccod.push({
        ...pilccod,
      });
    }

    // Update additional history
    if (additionalHistory) {
      patient.additionalHistory = additionalHistory;
    }

    // Add new local examination
    if (localExamination) {
      patient.localExamination.push({
        ...localExamination,
   
      });
    }

    // Add new systemic examination
    if (systemicExamination) {
      patient.systemicExamination.push({
        ...systemicExamination,

      });
    }

    // Add new other systemic examination
    if (otherSystemicExamination) {
      patient.otherSystemicExamination.push({
        ...otherSystemicExamination,
      
      });
    }

    // Add new treatments
    if (treatmentsAtPreviousHospital) {
      if (treatmentsAtPreviousHospital.treatmentReceivedAtTimeOfAdmission) {
        patient.treatmentReceivedAtPreviousHospital.treatmentReceivedAtTimeOfAdmission.push({
          treatment: treatmentsAtPreviousHospital.treatmentReceivedAtTimeOfAdmission,
          date: new Date()
        });
      }
      if (treatmentsAtPreviousHospital.dischargeWithFollowingTreatment) {
        patient.treatmentReceivedAtPreviousHospital.dischargeWithFollowingTreatment.push({
          treatment: treatmentsAtPreviousHospital.dischargeWithFollowingTreatment,
          date: new Date()
        });
      }
    }

    // Add new investigations
    if (investigations) {
      patient.investigations.push({
        ...investigations,
      });
    }

    await patient.save();

    res.status(200).json({ 
      message: "Patient advanced details updated successfully", 
      patient 
    });
  } catch (error) {
    console.error("Error updating patient advanced details:", error);
    res.status(500).json({ 
      message: "Error updating patient advanced details", 
      error: error.message 
    });
  }
};

export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({isActive:true,isDeleted:false}).sort({ createdAt: -1 }); // Sort by creation date, newest first

    return res.status(200).json({
      message: "Patients fetched successfully",
      patients,
    });
  } catch (error) {
    console.error("Error fetching patients:", error);
    res
      .status(500)
      .json({ message: "Error fetching patients", error: error.message });
  }
};

export const getPatientDetailsById = async (req, res) => {
  try {
    const patients = await Patient.findById(req.params.id);
    return res.status(200).json({ patients });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching patients", error: error.message });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const objectId = new mongoose.Types.ObjectId(req.body.id);

    await Patient.findByIdAndUpdate(objectId, {
      isDeleted: true,
      isActive: false,
    });
    return res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting patient", error: error.message });
  }
};

export const addEditPatientOngoingTreatment = async (req, res) => {
  try {
    const { id, ourPlanOfAction, status } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Patient ID is required" });
    }

    const objectId = mongoose.Types.ObjectId.createFromHexString(id);
    const patient = await Patient.findById(objectId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Add new plan of action
    if (ourPlanOfAction) {
      patient.ourPlanOfAction.push({
        treatment: ourPlanOfAction.treatment,
        date: ourPlanOfAction.date || new Date()
      });
    }

    // Update status if provided
    if (status) {
      patient.status = status;
    }

    await patient.save();

    res.status(200).json({
      message: "Patient ongoing treatment updated successfully",
      patient
    });
  } catch (error) {
    console.error("Error updating patient ongoing treatment:", error);
    res.status(500).json({
      message: "Error updating patient ongoing treatment",
      error: error.message
    });
  }
};
