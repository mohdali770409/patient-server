import RecoveryUpdate from '../model/recovery.model.js';
import mongoose from 'mongoose';

export const createEditRecoveryUpdate = async (req, res) => {
    try {
      const { patientId, title, description, images, videos } = req.body;
  
      if (!mongoose.Types.ObjectId.isValid(patientId)) {
        return res.status(400).json({ message: 'Invalid patient ID' });
      }
  
      const existingUpdate = await RecoveryUpdate.findOne({ patientId });
  
      if (existingUpdate) {
        // Update existing record
        const updatedRecoveryUpdate = await RecoveryUpdate.findByIdAndUpdate(
          existingUpdate._id,
          { title, description, images, videos },
          { new: true }
        );
        return res.status(200).json(updatedRecoveryUpdate);
      } else {
        // Create new record
        const newRecoveryUpdate = new RecoveryUpdate({
          patientId,
          title,
          description,
          images,
          videos
        });
  
        const savedUpdate = await newRecoveryUpdate.save();
        return res.status(201).json(savedUpdate);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };



export const getSingleRecoveryUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid recovery update ID' });
    }

    const recoveryUpdate = await RecoveryUpdate.findOne({patientId:id});

    if (!recoveryUpdate) {
      return res.status(404).json({ message: 'Recovery update not found' });
    }

    res.status(200).json(recoveryUpdate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

