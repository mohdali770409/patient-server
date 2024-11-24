import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    registrationNumber: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    phone: { type: String, required: true },
    email: { type: String },
    religion: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String },
    street: { type: String, required: true },
    locality: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String },
    medicalHistory: {
      historyOfPresentIllness: { type: String },
      pastHistory: { type: String },
      personalHistory: { type: String },
      familyHistory: { type: String },
      historyOfMajorIllness: { type: String },
    },
    provisionalDiagnosis: { type: String },
    differentialDiagnosis: { type: String },
    finalDiagnosis: { type: String },
    vitalSigns: [
      {
        temperature: { type: Number },
        bloodPressure: { type: String },
        pulseRate: { type: Number },
        spO2: { type: Number },
        respiratoryRate: { type: Number },
        date: { type: Date, default: Date.now },
      },
    ],
    pilccod: [
      {
        pallor: {
          value: { type: String, enum: ["positive", "negative"] },
          description: { type: String },
        },
        icterus: {
          value: { type: String, enum: ["positive", "negative"] },
          description: { type: String },
        },
        lymphadenopathy: {
          value: { type: String, enum: ["positive", "negative"] },
          description: { type: String },
        },
        clubbing: {
          value: { type: String, enum: ["positive", "negative"] },
          description: { type: String },
        },
        cyanosis: {
          value: { type: String, enum: ["positive", "negative"] },
          description: { type: String },
        },
        oedema: {
          value: { type: String, enum: ["positive", "negative"] },
          description: { type: String },
        },
        dehydration: {
          value: { type: String, enum: ["positive", "negative"] },
          description: { type: String },
        },
        date: { type: Date, default: Date.now },
      },
    ],
    additionalHistory: {
      feverHistory: { type: String },
      tuberculosisHistory: { type: String },
    },
    localExamination: [
      {
        others: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
    systemicExamination: [
      {
        inspection: { type: String },
        palpation: { type: String },
        percussion: { type: String },
        auscultation: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
    otherSystemicExamination: [
      {
        cns: {
          inspection: { type: String },
          palpation: { type: String },
          percussion: { type: String },
          auscultation: { type: String },
        },
        renal: {
          inspection: { type: String },
          palpation: { type: String },
          percussion: { type: String },
          auscultation: { type: String },
        },
        gastrointestinal: {
          inspection: { type: String },
          palpation: { type: String },
          percussion: { type: String },
          auscultation: { type: String },
        },
        cardiovascular: {
          inspection: { type: String },
          palpation: { type: String },
          percussion: { type: String },
          auscultation: { type: String },
        },
        date: { type: Date, default: Date.now },
      },
    ],
    treatmentReceivedAtPreviousHospital: {
      treatmentReceivedAtTimeOfAdmission: [
        {
          treatment: { type: String },
          date: { type: Date, default: Date.now },
        },
      ],
      dischargeWithFollowingTreatment: [
        {
          treatment: { type: String },
          date: { type: Date, default: Date.now },
        },
      ],
    },
    symptomsAndDiseases: {
      symptoms: {
        type: [String],
        default: [],
      },
      diseases: {
        type: [String],
        default: [],
      },
    },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    chiefComplaint: [
      {
        complaint: { type: String, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    ourPlanOfAction: [
      {
        treatment: { type: String, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    status: {
      type: String,
      enum: ["cured", "defaulter", "improving", "relapser"],
    },
    investigations: [
      {
        laboratoryAnalysis: {
          bodyFluid: {
            bloodAnalysis: { type: String },
            csf: { type: String },
            asciticFluid: { type: String },
            pleuralFluid: { type: String },
            amnioticFluid: { type: String },
            synvonialFluid: { type: String },
            mucus: { type: String },
            others: { type: String },
          },
          urineAnalysis: { type: String },
          stoolAnalysis: { type: String },
          others: { type: String },
        },
        imaging: {
          xray: {
            report: { type: String },
            images: [{ type: String }],
          },
          ct: {
            report: { type: String },
            images: [{ type: String }],
          },
          cect: {
            report: { type: String },
            images: [{ type: String }],
          },
          hrct: {
            report: { type: String },
            images: [{ type: String }],
          },
          mri: {
            report: { type: String },
            images: [{ type: String }],
          },
          hsg: {
            report: { type: String },
            images: [{ type: String }],
          },
          usg: {
            report: { type: String },
            images: [{ type: String }],
          },
          others: {
            report: { type: String },
            images: [{ type: String }],
          },
        },
        biopsy: { type: String },
        markers: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
