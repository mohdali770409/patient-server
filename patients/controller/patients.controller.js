import Patient from "../models/patient.model.js";

export const addNewPatient = async (req, res) => {
  try {
    const {
      patientId,
      tokenNumber,
      firstName,
      lastName,
      phone,
      email,
      age,
      gender,
      street,
      locality,
      city,
      state,
      pinCode,
      historyOfMajorIllness,
    } = req.body;


    const newPatient = new Patient({
      patientId,
      tokenNumber,
      firstName,
      lastName,
      phone,
      email,
      age,
      gender,
      street,
      locality,
      city,
      state,
      pinCode,
      historyOfMajorIllness,
    });

    await newPatient.save();

    return res
      .status(201)
      .json({ message: "Patient added successfully", patient: newPatient });
  } catch (error) {
    console.error("Error adding new patient:", error);
    res
      .status(500)
      .json({ message: "Error adding new patient", error: error.message });
  }
};
