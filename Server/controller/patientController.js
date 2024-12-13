import Patient from "../models/patientModel.js";

export const dropMobileIndex = async (req, res) => {
  try {
    await Patient.collection.dropIndex("phoneNumber");
    res.send("Index dropped successfully");
  } catch (error) {
    console.error("Error dropping index:", error);
    res.status(500).send("Error dropping index");
  }
};

export const findPatientsByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const patients = await Patient.find({
      userId: userId,
    });

    console.log(userId);
    console.log(patients);

    return res.status(200).json({
      success: true,
      message: "Patients by same userId",
      data: patients,
    })
  } catch (error) {
    return res.status(500).json({
      message: "Error registering the patient",
      error: error.message,
    });
  }
}

export const registerPatient = async (req, res) => {
  try {
    console.log(req.user);
    const userId = req.user.id;
    const { doctor, patient, emergencyContact } = req.body;

    console.log(userId, doctor, patient, emergencyContact);

    const existingPatient = await Patient.findOne({
      "patient.firstName": patient.firstName,
      "patient.lastName": patient.lastName,
      "patient.DOB": patient.DOB,
    });

    if (existingPatient) {
      return res.status(400).json("Patient already exiist");
    }

    const newPatient = new Patient({
      userId: userId,
      doctor: {
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        admissionDate: doctor.admissionDate,
        plannedProcedure: doctor.plannedProcedure,
      },
      patient: {
        firstName: patient.firstName,
        lastName: patient.lastName,
        DOB: patient.DOB,
        gender: patient.gender,
      },
      emergencyContact: {
        name: emergencyContact.name,
        phoneNumber: emergencyContact.phoneNumber,
        relationship: emergencyContact.relationship,
      },
    });

    // dropMobileIndex()

    const savePatient = await newPatient.save();

    return res.status(201).json("Patient register successfully");
  } catch (error) {
    return res.status(500).json({
      message: "Error registering the patient",
      error: error.message,
    });
  }
};

export const viewPatient = async (req, res) => {
  try {
    const getPatient = await Patient.find();

    if (!getPatient.length === 0) {
      return res.status(400).json({
        message: "There is no patient for you to view",
      });
    }
    return res.status(200).json({
      message: "Please view all the patients",
      data: getPatient,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error viewing the patient",
      error: error.message,
    });
  }
};

export const viewPatientById = async (req, res) => {
  try {
    const getId = req.params.id;

    console.log(getId);

    const response = await Patient.findById(getId);

    console.log(response);

    if (!response) {
      return res.status(400).json({ message: "patient not found" });
    }

    return res.status(200).json({
      message: "Successfully fetched the patient by its ID",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error finding the patient by its ID",
      error: error.message,
    });
  }
};

export const managePatient = async (req, res) => {
  try {
    const getId = req.params.id;

    // const keys = Object.keys(req.body);
    console.log(getId);
    const updateData = req.body;

    console.log(updateData);
    // console.log(keys)

    const updatedData = await Patient.findByIdAndUpdate(getId, updateData, {
      new: true,
    });

    if (!updatedData) {
      return res.status(400).json({
        message: "UpdatedData not found",
        error: error.message,
      });
    }

    return res.status(200).json({
      message: "Successfully Updated!",
      data: updatedData,
    });
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: "Error updating the data",
      error: error.message,
    });
  }
};

export const dischargePatient = async (req, res) => {
  try {
    const getId = req.params.id;

    const deleteData = await Patient.findByIdAndDelete(getId);

    if (!deleteData) {
      return res.status(400).json({
        message: "Couldn't find deleted data",
        error: error.message,
      });
    }

    return res.status(200).json({
      message: "Data got deleted by its id succesfully",
      data: deleteData,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error deleting the data",
      error: error.message,
    });
  }
};
