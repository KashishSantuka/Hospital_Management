import mongoose, { Schema } from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    userId: {                           
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    doctor: {
      firstName: {
        type: String,
        required: true,
        minlength: 4,
      },
      lastName: {
        type: String,
        required: true,
        minlength: 4,
      },

      admissionDate: {
        type: Date,
        required: true,
      },
      plannedProcedure: {
        type: String,
        enum: [
          "SurgicalProcedure",
          "DiagnosticTest",
          "KneeReplacement",
          "OtherMedicalInterventions",
        ],
        required: true,
      },
    },

    patient: {
      firstName: {
        type: String,
        required: true,
        minlength: 4,
      },

      lastName: {
        type: String,
        required: true,
        minlength: 4,
      },

      DOB: {
        type: Date,
        required: true,
      },

      gender: {
        type: String,
        enum: ["Male", "Female", "Others"],
        required: true,
      },
    },

    emergencyContact: {
      name: { type: String, required: true, minlength: 4 },
      phoneNumber: {
        type: Number,
        required: true,
        unique: false,
        sparse: true, 
        match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
      },

      relationship: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

// patientSchema.virtual('patients', {
//   ref: 'User',         
//   localField: '_id',      
//   foreignField: 'userId'  
// });

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
