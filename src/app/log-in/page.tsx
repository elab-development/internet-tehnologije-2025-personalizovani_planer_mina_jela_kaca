'use client';

import Link from "next/link";
import { SubmitEvent, useState } from "react";

export default function LogIn (){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = async (e:SubmitEvent) => {
        e.preventDefault();

        const res = await fetch('/api/auth/login/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password})
        });

        if(res.ok){
            window.location.href = '/';
        }else{
            alert("Neuspesno logovanje!");
        }

    }
    return(
        <div className="min-h-screen flex items-center justify-center">
            <form 
                onSubmit={handleSubmit}
                className="w-full max-w-sm space-y-4 border p-6 shadow-md"
            >
                <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
                <input 
                    type="text"
                    placeholder="email"
                    className="w-full border px-3 py-2"
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                />
                <input 
                    type="password"
                    placeholder="password"
                    className="w-full border px-3 py-2"
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                    required
                />

                <button 
                    type="submit" 
                    className="w-full bg-black border text-white py-2 hover:bg-pink-600"
                >
                    Uloguj se
                </button>

                <p className="mb-4 text-center">Nemate nalog? 
                    <Link className="text-purple-800 hover:text-pink-600" rel="stylesheet" href="/sign-in"> Registrujte se </Link>
                </p>
            </form>
        </div>
    );

}