import Medicine from "../models/medicineModel.js";

export const getMedicine = async (req, res) => {
  try {
    const medicineData = await Medicine.find();

    if (!medicineData) {
      return res.status(400).json({
        success: false,
        message: "Medicine not found",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Succesfully fetched the data",
      data: medicineData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching the medicine",
      error: error.message,
    });
  }
};

export const getMedicineById = async (req, res) => {
  try {
    const getId = req.params.name;

    const foundMedicine = await Medicine.findById(getId);

    if (!foundMedicine) {
      return res.status(400).json({
        success: false,
        message: "Medicine name not found",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Succesfully fetched the data",
      data: foundMedicine,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching the medicine by its ID",
      error: error.message,
    });
  }
};

export const postMedicine = async (req, res) => {
  try {
    const { name, quantity, manufacture, expirationDate, pricing } = req.body;

    const existngMedicine = await Medicine.findOne({ name });

    if (existngMedicine) {
      return res.status(400).json({
        success: false,
        message: "Medicine is already present",
        error: error.message,
      });
    }

    const newMedicine = new Medicine({
      name,
      quantity,
      manufacture,
      expirationDate,
      pricing,
    });

    const savedMedicine = await newMedicine.save();

    return res.status(200).json({
      success: true,
      message: "Medicine added successfully",
      data: savedMedicine,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occured while adding",
      error: error.message,
    });
  }
};

export const updateMedicine = async (req, res) => {
  try {
    const getId = req.params.id;

    console.log(getId);
    const updateData = req.body;

    console.log(updateData);

    const updatedData = await Medicine.findByIdAndUpdate(getId, updateData, {
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
    res.status(500).json({
      success: false,
      message: "Error updating the data",
      error: error.message,
    });
  }
};

export const deleteMedicine = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedData = await Medicine.findByIdAndDelete(id);

    if (!deletedData) {
      res.status(400).json({
        success: false,
        message: "Data id not found",
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully deleted the data",
      data: deletedData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Deleting the data",
      error: error.message,
    });
  }
};
