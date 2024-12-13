import mongoose from "mongoose";

const isValidPhoneNumber = (v) => {
  return /^\d{10}$/.test(v);
};

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      sparse: true,
      validate: {
        validator: isValidPhoneNumber,
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    designation: {
      type: String,
      enum: ["Doctor", "Manager", "Nurse"],
      required: [true, "Designation is required."],
    },
    gender: {
      type: String,
      enum: ["M", "F"],
      required: [true, "Gender is required."],
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema, "employees");

export default Employee;
