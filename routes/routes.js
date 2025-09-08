import express from "express";
import AppointmentController from "./AppointmentController.js";
import doctorController from "./DoctorController.js";
import pacientController from "./PacientController.js";
import prescriptionController from "./PrescriptionController.js";

const router = express.Router();

router.get(
    "/", function(req, res){
        console.log("Oi");
        res.status(200).json({message: "Oi"});
    }
);

router.use("/", AppointmentController);
router.use("/", doctorController);
router.use("/", pacientController);
router.use("/", prescriptionController);

export default router;