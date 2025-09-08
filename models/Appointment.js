import mongoose from "mongoose";

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
        date: {
            type: Date,
            required: [true, 'Appointment Date is Required']
        },
        doctorId: {
            type: String,
            required: [true, 'DoctorID is required']
        },
        pacientId: {
            type: String,
            required: [true, 'PacientID is required']
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }    
);

const appointment = mongoose.model('Appointment', appointmentSchema);
export default appointment;