import express from "express";
import AppointmentController from "./AppointmentController.js";
import doctorController from "./DoctorController.js";
import pacientController from "./PacientController.js";
import prescriptionController from "./PrescriptionController.js";
import doctorService from "../services/DoctorService.js";
import verifyToken from "../middleware/authMiddleware.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// import pdfkit
import doc from "pdfkit";

const router = express.Router();

router.get(
    "/", function(req, res){
        console.log("Oi");
        res.status(200).json({message: "Oi"});
    }
);

//mapeamento do login
router.post('/login', async (req, res) => {
    try {
        const {login, password} = req.body;
        const doctor = await doctorService.getDoctorByLogin(login);
        if(!doctor){
            return res.status(401).json({message: 'Authentication failed. Doctor not found.'});
        }
        const passwordMatch = await bcrypt.compare(password, doctor.password);
        if(!passwordMatch){
            return res.status(401).json({message: 'Authentication failed. Wrong password.'});
        }
        const token = jwt.sign({doctorId: doctor._id}, 'your-secret-key', {expiresIn: '1h'});
        res.status(200).json({token});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Login failed.'});
    }
})

router.use("/", verifyToken, AppointmentController);
router.use("/", verifyToken, doctorController);
router.use("/", verifyToken, pacientController);
router.use("/", verifyToken, prescriptionController);

export default router;