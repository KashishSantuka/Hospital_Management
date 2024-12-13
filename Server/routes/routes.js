import { Router } from "express";
import { registerUser, loginUser } from "../controller/userController.js";
import {
  dischargePatient,
  dropMobileIndex,
  findPatientsByUserId,
  managePatient,
  registerPatient,
  viewPatient,
  viewPatientById,
} from "../controller/patientController.js";
import { authentication, checkRole } from "../middleware/authMiddleware.js";
import {
  deleteEmployee,
  getEmployee,
  postEmployee,
  updateEmployee,
} from "../controller/employeeController.js";
import {
  deleteMedicine,
  getMedicine,
  postMedicine,
  updateMedicine,
} from "../controller/medicineController.js";

const router = Router();

//GET ROUTES:-------------

router.get("/viewpatient", authentication, checkRole(["admin"]), viewPatient);
router.get(
  "/viewpatient/:id",
  authentication,
  checkRole(["admin", "user"]),
  viewPatientById
);
router.get(
  "/getpatientsbyuserid",
  authentication,
  checkRole(["admin", "user"]),
  findPatientsByUserId
);

router.get(
  "/getmedicine",
  authentication,
  checkRole(["admin", "user"]),
  getMedicine
);
router.get(
  "/getmedicine/:name",
  authentication,
  checkRole(["admin", "user"]),
  getMedicine
);
router.get("/getemployee", authentication, checkRole(["admin"]), getEmployee);

//POST ROUTES:--------

router.post("/userregister", registerUser);
router.post("/login", loginUser);

router.post(
  "/registerpatient",
  authentication,
  checkRole(["user", "admin"]),
  registerPatient
);

//patient post route
// router.post(
//   "/patientregistration",
//   authentication,
//   checkRole(["user", "admin"]),
//   registerPatient
// );
//employee post route
router.post(
  "/postemployee",
  authentication,
  checkRole(["admin"]),
  postEmployee
);

router.post(
  "/postmedicine",
  authentication,
  checkRole(["admin"]),
  postMedicine
);

//UPDATE ROUTES: ----------------------

router.patch(
  "/managepatient/:id",
  authentication,
  checkRole(["user"]),
  managePatient
);

router.patch(
  "/updateemployee/:id",
  authentication,
  checkRole(["admin"]),
  updateEmployee
);

router.patch(
  "/updatemedicine/:id",
  authentication,
  checkRole(["admin"]),
  updateMedicine
);

//DELETE ROUTES: ---------------------

router.delete(
  "/dischargepatient/:id",
  authentication,
  checkRole(["admin"]),
  dischargePatient
);

router.delete(
  "/deleteemployee/:id",
  authentication,
  checkRole(["admin"]),
  deleteEmployee
);

router.delete(
  "/deletemedicine/:id",
  authentication,
  checkRole(["admin"]),
  deleteMedicine
);

router.delete("/dropMobileIndex", dropMobileIndex);

export default router;
