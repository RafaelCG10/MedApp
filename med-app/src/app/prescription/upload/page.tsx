"use client"
import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PrescriptionCreate(){
    const router = useRouter();

    const [file, setFile] = useState<File>();
    const [error, setError] = useState<string>('');

    const [prescription, setPrescriptions] = useState(null);
    return(
        <>
            <Link href={"/home"}>Voltar</Link>
            <table>
                <thead>
                    <tr>
                        <td className='border border-slate-300'>Data</td>
                        <td className='border border-slate-300 text-center'>Medicine</td>
                        <td className='border border-slate-300 text-center'>Dosage</td>
                        <td className='border border-slate-300 text-center'>Instructions</td>
                    </tr>
                </thead>
                <tbody className="doctors" id="doctors">
                    {!!prescription && prescription.map((prescription:any) => (
                        <tr>
                           <td className='border border-slate-300'>{prescription.date}</td> 
                           <td className='border border-slate-300 text-center'>{prescription.medicine}</td> 
                           <td className='border border-slate-300 text-center'>{prescription.dosage}</td> 
                           <td className='border border-slate-300 text-center'>{prescription.instructions}</td> 
                           <td className='border border-slate-300 text-center'><input type='file' name='file' onChange={(e) => setFile(e.target.files?.[0])}/></td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    ); 
}
