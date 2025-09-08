import express from "express";
import bcrypt from "bcrypt";
import doctorService from "../services/DoctorService.js";

let router = express.Router();

router.get('/doctors', async(req, res) => {
    try {
        const doctor = await doctorService.getAllDoctors();
        res.send(doctor);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/getDoctors/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const doctor = await doctorService.getDoctor(id);
        res.send(doctor);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post('/postDoctors', async(req, res) => {
    const {name, login, password, medicalSpeciality, medicalRegistration, email, phone} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const doctor = await doctorService.saveDoctor({name, login, password: hashedPassword, medicalSpeciality, medicalRegistration, email, phone});
        res.status(201).send(doctor);
    } catch (error) {
        console.log(error);
        res.status(500).send('Falha ao registrar médico' + error);
    }
});

router.put('/doctors/:id', async(req, res) => {
    const {id} = req.params;
    const {name, login, password, medicalSpeciality, medicalRegistration, email, phone} = req.body;
    try {
        const doctor = await doctorService.updateDoctor(id,{name, login, password, medicalSpeciality, medicalRegistration, email, phone});
        res.send(doctor);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.delete('/doctors/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const doctor = await doctorService.deleteDoctor(id);
        res.send(doctor);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

export default router;