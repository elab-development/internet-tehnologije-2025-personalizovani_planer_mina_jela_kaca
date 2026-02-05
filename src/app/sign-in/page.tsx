'use client'

import Link from "next/link";
import { SubmitEvent, useState } from "react";

type Body = {
    username: string;
    email: string;
    ime: string;
    prezime: string;
    adresa: string;
    password: string;
}

export default function SignUpPage(){

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');
    const [adresa, setAdresa] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault();

        const res = await fetch('/api/auth/register/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, email, ime, prezime, adresa, password})
        });

        if(res.ok){
            window.location.href = '/log-in/';
        }else{
            const data = await res.json();
            alert(`Error: ${data.error}`);
        }

    }

    return(
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm space-y-4 border p-6 shadow-md" 
            >
                <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
                <input 
                    type="text" 
                    placeholder="username"
                    className="w-full border px-3 py-2"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input 
                    type="text" 
                    placeholder="email"
                    className="w-full border px-3 py-2"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    type="text" 
                    placeholder="ime"
                    className="w-full border px-3 py-2"
                    onChange={(e) => setIme(e.target.value)}
                    required
                />
                <input 
                    type="text" 
                    placeholder="prezime"
                    className="w-full border px-3 py-2"
                    onChange={(e) => setPrezime(e.target.value)}
                    required
                />
                <input 
                    type="text" 
                    placeholder="adresa"
                    className="w-full border px-3 py-2"
                    onChange={(e) => setAdresa(e.target.value)}
                    required
                />
                <input 
                    type="password" 
                    placeholder="password"
                    className="w-full border px-3 py-2"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button type="submit" className="w-full bg-black border text-white py-2 hover:bg-pink-600">
                    Kreiraj nalog
                </button>

                <p className="mb-4 text-center">Već imate nalog? 
                    <Link className="text-purple-800 hover:text-pink-600" rel="stylesheet" href="/log-in"> Ulogujte se </Link>
                </p>
            </form>
        </div>
    );

}
