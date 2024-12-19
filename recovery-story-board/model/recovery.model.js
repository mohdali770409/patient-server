import mongoose from "mongoose";

const RecoveryUpdateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    images: [{
      type: String,
      required: true
    }],
    videos: [{
      type: String,
      required: true
    }],
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true
    }
  },
  { 
    timestamps: true 
  }
);

export default mongoose.model("RecoveryUpdate", RecoveryUpdateSchema);