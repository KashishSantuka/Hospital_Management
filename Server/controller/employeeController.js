import Employee from "../models/employeeModel.js";

export const getEmployee = async (req, res) => {
  try {
    const EmployeeData = await Employee.find();
    console.log(EmployeeData);
    if (EmployeeData.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Employeee not found",
      });
    }
    return res.status(200).json({
      message: "Please vieew all the employee",
      data: EmployeeData,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching the data",
      error: error.message,
    });
  }
};

export const postEmployee = async (req, res) => {
  try {
    const { name, email, phoneNumber, designation, gender } = req.body;

    const existingUser = await Employee.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exist",
        error: error.message,
      });
    }

    const newEmployee = new Employee({
      name,
      email,
      phoneNumber,
      designation,
      gender,
    });

    const saveEmployee = await newEmployee.save();

    return res.status(200).json({
      success: true,
      message: "Successfully saved!",
      data: saveEmployee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const updateID = req.params.id;

    console.log(updateID);

    const data = req.body;

    if (!updateID) {
      return res.status(400).json({
        success: true,
        message: "updating Id not found",
        error: error.message,
      });
    }

    const updatedData = await Employee.findByIdAndUpdate(updateID, data, {
      new: true,
    });

    console.log(updatedData);

    return res.status(200).json({
      success: true,
      message: "Data got updated successfully",
      data: updatedData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error while updating the data",
      error: error.message,
    });
  }
};


export const deleteEmployee = async (req, res) => {
  try {
    const deleteID = req.params.id;
    console.log(deleteID);

    if (!deleteID) {
      return res.status(400).json({
        success: false,
        message: "Deleted ID not found",
        error: error.message,
      });
    }

    const deletedData = await Employee.findByIdAndDelete(deleteID);

    return res.status(200).json({
      success: true,
      message: "data successfully deleted",
      data: deletedData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting the data",
      error: error.message,
    });
  }
};
