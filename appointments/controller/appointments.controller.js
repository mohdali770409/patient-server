import Appointment from "../model/appointments.model.js";
import mongoose from "mongoose";

// Create or edit appointment
export const addEditAppointment = async (req, res) => {
  try {
    const { id, patient, appointmentDate, location } = req.body;

    // Check if appointment exists for editing
    let appointment;
    if (id) {
      const objectId = mongoose.Types.ObjectId.createFromHexString(id);
      appointment = await Appointment.findById(objectId);
    }

    if (appointment) {
      // Update existing appointment
      appointment.patient = patient;
      appointment.appointmentDate = appointmentDate;
      appointment.location = location;
      appointment.isDeleted = false;
      appointment.isActive = true;

      await appointment.save();
      return res.status(200).json({
        message: "Appointment updated successfully",
        appointment,
      });
    } else {
      // Create new appointment
      const newAppointment = new Appointment({
        patient,
        appointmentDate,
        location,
      });

      await newAppointment.save();
      return res.status(201).json({
        message: "Appointment created successfully",
        appointment: newAppointment,
      });
    }
  } catch (error) {
    console.error("Error in appointment creation/update:", error);
    return res.status(500).json({
      message: "Error in appointment creation/update",
      error: error.message,
    });
  }
};

// Get upcoming appointments
export const getUpcomingAppointments = async (req, res) => {
  try {
    const currentDate = new Date();
    
    const appointments = await Appointment.find({
      appointmentDate: { $gte: currentDate },
      isActive: true,
      isDeleted: false,
    })
    .populate('patient', 'firstName lastName phone email') // Populate patient details
    .sort({ appointmentDate: 1 }); // Sort by date ascending

    return res.status(200).json({
      message: "Upcoming appointments fetched successfully",
      appointments,
    });
  } catch (error) {
    console.error("Error fetching upcoming appointments:", error);
    return res.status(500).json({
      message: "Error fetching upcoming appointments",
      error: error.message,
    });
  }
};

// Get past appointments
export const getPastAppointments = async (req, res) => {
  try {
    const currentDate = new Date();
    
    const appointments = await Appointment.find({
      appointmentDate: { $lt: currentDate },
      isActive: true,
      isDeleted: false,
    })
    .populate('patient', 'firstName lastName phone email')
    .sort({ appointmentDate: -1 }); // Sort by date descending

    return res.status(200).json({
      message: "Past appointments fetched successfully",
      appointments,
    });
  } catch (error) {
    console.error("Error fetching past appointments:", error);
    return res.status(500).json({
      message: "Error fetching past appointments",
      error: error.message,
    });
  }
};

// Delete appointment
export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.body;
    const objectId = mongoose.Types.ObjectId.createFromHexString(id);

    await Appointment.findByIdAndUpdate(objectId, {
      isDeleted: true,
      isActive: false,
    });

    return res.status(200).json({
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return res.status(500).json({
      message: "Error deleting appointment",
      error: error.message,
    });
  }
};
