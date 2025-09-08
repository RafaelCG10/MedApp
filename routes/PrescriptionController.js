import express from "express";
import prescriptionService from "../services/PrescriptionService.js";
import multer from 'multer';
import process from 'process';
import path from 'path';

let router = express.Router();

const storage = multer.diskStorage(
    {
        destination: function(req, file, cb){
            cb(null, './MedApp/prescriptions/');
        },
        filename: function(req, file, cb){
            cb(null, file.originalname);
        }
    }
);

const upload = multer({storage: storage});

router.post('/uploadPrescriptions/:id', upload.single('file'), async(req, res) => {
    try {
        const {id} = req.params;
        let prescription = await prescriptionService.getPrescription(id);

        const file = "./MedApp/src/prescriptions/" + req.file.originalname;
        prescription = await prescriptionService.updatePrescription(id, {file});

        return res.status(200).send(prescription);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.get('/readPrescription/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const prescription = await prescriptionService.getPrescription(id);
        let filePath = path.resolve(process.cwd() + "/../" + prescription.file);
        res.status(200).sendFile(filePath);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.get('/prescriptions', async(req, res) => {
    try {
        const prescription = await prescriptionService.getAllPrescriptions();
        res.send(prescription);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/getPrescriptions/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const prescription = await prescriptionService.getPrescription(id);
        res.send(prescription);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post('/postPrescriptions', async(req, res) => {
    const {date, appointmentId, medicine, dosage, instructions} = req.body;
    try {
        const prescription = await prescriptionService.savePrescription({date, appointmentId, medicine, dosage, instructions});
        res.send(prescription);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.put('/prescriptions/:id', async(req, res) => {
    const {id} = req.params;
    const {date, appointmentId, medicine, dosage, instructions} = req.body;
    try {
        const prescription = await prescriptionService.updatePrescription(id,{date, appointmentId, medicine, dosage, instructions});
        res.send(prescription);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.delete('/prescriptions/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const prescription = await prescriptionService.deletePrescription(id);
        res.send(prescription);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/generatePrescription/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const prescription = await prescriptionService.getPrescription(id);
        let generatePrescription = await prescriptionService.generatePrescriptionFile(prescription);

        const file = "./src/prescriptions/" + id + ".pdf";
        generatePrescription = await prescriptionService.updatePrescription(id, {file});

        res.send(generatePrescription);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

export default router;