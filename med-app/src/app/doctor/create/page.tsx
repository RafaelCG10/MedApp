"use client"

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function DoctorCreate() {

    const router = useRouter();

    const [name, setName] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [medicalSpeciality, setMedicalSpeciality] = useState<string>('');
    const [medicalRegistration, setMedicalRegistration] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string>('')

    const addDoctor = async (e: any) => {
        e.preventDefault();
        setError(null);

        if (name != "" && login != ""
            && password != "" && medicalSpeciality != ""
            && medicalRegistration != "" && email != "" && phone != "") {

            const formData = {
                name: name,
                login: login,
                password: password,
                medicalSpeciality: medicalSpeciality,
                medicalRegistration: medicalRegistration,
                email: email,
                phone: phone
            }

            console.log(sessionStorage.getItem("token"));
            if(sessionStorage.getItem("token") == null){
                setToken('');
            }

            const add = await fetch('http://127.0.0.1:3001/postDoctors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem("token") || ''
                },
                body: JSON.stringify(formData)
            });

            const content = await add.json();
            
            if (content.login) {
                router.push('/home');
            } else {
                setError(content.error);
            }

        }


    };

    return (
        <>
            <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/home">Voltar</Link>
            <form className='w-full' onSubmit={addDoctor}>
                <span className='font-bold text-yellow-500 py-2 block underline text-2xl'>Formulário Criação de Médico</span>
                <div className='w-full py-2'>
                    <label htmlFor="name" className='text-sm font-bold py-2 block'>Nome</label>
                    <input type='text' name='name' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setName(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="login" className='text-sm font-bold py-2 block'>Login</label>
                    <input type="text" name='login' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setLogin(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="password" className='text-sm font-bold py-2 block'>Senha</label>
                    <input type="password" name='password' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setPassword(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="medicalSpeciality" className='text-sm font-bold py-2 block'>Especialidade Médica</label>
                    <input type="text" name='medicalSpeciality' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setMedicalSpeciality(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="medicalRegistration" className='text-sm font-bold py-2 block'>Registro Médico</label>
                    <input type="text" name='medicalRegistration' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setMedicalRegistration(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="email" className='text-sm font-bold py-2 block'>Email</label>
                    <input type="email" name='email' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setEmail(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="phone" className='text-sm font-bold py-2 block'>Telefone</label>
                    <input type="phone" name='phone' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setPhone(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <button type="submit" className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">Submit</button>
                </div>
                <div>
                    {error && <div className="p-2 text-white border-gray-200 border-[1px] rounded-sm bg-red-400" style={{ color: 'red' }}>{error}</div>}
                </div>
            </form></>
    )
}