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
    } = req.body;

    // Check if patient already exists
    let patient;
    if (id) {
      // Convert string id to MongoDB ObjectId
      const objectId = new mongoose.Types.ObjectId(id);
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
      historyOfMajorIllness,
      provisionalDiagnosis,
      differentialDiagnosis,
      finalDiagnosis,
      vitalSigns,
      pilccod,
      additionalHistory,
      localExamination,
      systemicExamination,
      otherSystemicExamination,
      treatmentReceivedAtPreviousHospital
    } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Patient ID is required" });
    }

    const objectId = mongoose.Types.ObjectId.createFromHexString(id);

    const patient = await Patient.findById(objectId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Update patient with advanced details
    patient.historyOfMajorIllness = historyOfMajorIllness;
    patient.provisionalDiagnosis = provisionalDiagnosis;
    patient.differentialDiagnosis = differentialDiagnosis;
    patient.finalDiagnosis = finalDiagnosis;

    // Add new vital signs to the array
    if (vitalSigns) {
      patient.vitalSigns.push(vitalSigns);
    }

    // Add new PILCCOD entry
    if (pilccod) {
      patient.pilccod.push(pilccod);
    }

    // Update additional history
    if (additionalHistory) {
      patient.additionalHistory = additionalHistory;
    }

    // Add new local examination entry
    if (localExamination) {
      patient.localExamination.push(localExamination);
    }

    // Add new systemic examination entry
    if (systemicExamination) {
      patient.systemicExamination.push(systemicExamination);
    }

    // Add new other systemic examination entry
    if (otherSystemicExamination) {
      patient.otherSystemicExamination.push(otherSystemicExamination);
    }

    // Update treatment received at previous hospital
    if (treatmentReceivedAtPreviousHospital) {
      if (treatmentReceivedAtPreviousHospital.treatmentReceivedAtTimeOfAdmission) {
        patient.treatmentReceivedAtPreviousHospital.treatmentReceivedAtTimeOfAdmission.push(
          ...treatmentReceivedAtPreviousHospital.treatmentReceivedAtTimeOfAdmission
        );
      }
      if (treatmentReceivedAtPreviousHospital.dischargeWithFollowingTreatment) {
        patient.treatmentReceivedAtPreviousHospital.dischargeWithFollowingTreatment.push(
          ...treatmentReceivedAtPreviousHospital.dischargeWithFollowingTreatment
        );
      }
    }

    await patient.save();

    res.status(200).json({ message: "Patient advanced details updated successfully", patient });
  } catch (error) {
    console.error("Error updating patient advanced details:", error);
    res.status(500).json({ message: "Error updating patient advanced details", error: error.message });
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
