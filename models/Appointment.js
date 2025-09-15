import mongoose from "mongoose";
import doctor from "./Doctor.js";
import pacient from "./Pacient.js";

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
        date: {
            type: Date,
            required: [true, 'Appointment Date is Required']
        },
        doctorId: {
            type: String,
            required: [true, 'DoctorID is required'],
            validator: async function(v) {
                return await doctor.exists({ _id: v });
            },
            message: props => `DoctorID ${props.value} does not exist`
        },
        pacientId: {
            type: String,
            required: [true, 'PacientID is required'],
            validator: async function(v){
                return await pacient.exists({ _id: v });
            },
            message: props => `PacientID ${props.value} does not exist`
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }    
);

const appointment = mongoose.model('Appointment', appointmentSchema);
export default appointment;

/*se o validator não funcionar, tente essa outra forma de fazer a validação
    validator: async function(v) {
                const id = new mongoose.Types.ObjectId(v); //convertendo um string em um objeto ID para ser encontrado no banco
                return doctor.exists({_id: id}); //verificando se o ID existe no banco
            },
           message: props => `DoctorID ${props.value} does not exist`
*/