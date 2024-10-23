import Patient from "../model/patient.model.js";

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
    if (id !== "") patient = await Patient.findOne({ id });

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
  
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({})
      .sort({ createdAt: -1 });  // Sort by creation date, newest first

    return res.status(200).json({ 
      message: "Patients fetched successfully",
      patients 
    });
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Error fetching patients", error: error.message });
  }
};

export const getPatientDetailsById = async (req, res) => {
  try {
    const patients = await Patient.findById(req.params.id);
   return res.status(200).json({ patients });
  } catch (error) {
    res.status(500).json({ message: "Error fetching patients", error: error.message });
  }
};