"use client";

import { useState } from "react";


type User = {
    id: string;
    ime: string;
    prezime: string;
    username: string;
    email: string;
    adresa: string;
    uloga: string;
    createdAt: string;
};

type Props = {
    pocetniKorisnici: User[];
    k: {id: string, ime: string}; //trenutno ulogovan
}

export function AdminKorisniciTabela({pocetniKorisnici, k}: Props){

    const [users, setUsers] = useState(pocetniKorisnici);

    const refreshUsers = async () => {
        const res = await fetch("/api/auth/admin/korisnici/");
        if (!res.ok) return;
        const data = await res.json();
        setUsers(data.users);
    };



    const handleDelete = async (id:string) => {
        if(id === k.id){
            alert("GREŠKA! Admin ne može samog sebe da obriše na ovoj stranici!");
            return;
        }
        
        if(!confirm("Da li ste sigurni da želite da obrišete korisnika?")) return;
    
        try{
            const res = await fetch("/api/auth/admin/korisnik-brisanje/" , {
            method: "DELETE",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({userID: id}),
            });

            if(!res.ok){
                const errorData = await res.json();
                alert(errorData.error || "Brisanje nije uspešno!");
                return;
            }
            const data = await res.json();
            
            if(data.success){
                await refreshUsers();
            }
        }catch(err){
            console.error(err);
            alert("Greška prilikom brisanja korisnika!");
        }
    };

    const handleUpdateKorisnik = async(id: string) =>{
        if(id === k.id){
            alert("GREŠKA! Admin ne može samom sebi da promeni ulogu!");
            return;
        }

        if(!confirm("Da li ste sigurni da želite da promenite ulogu korisnika?")) return;

        //API
        try{
            const res = await fetch("/api/auth/admin/korisnik-uloga/" , {
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({userID: id}),
            });

            if(!res.ok){
                const errorData = await res.json();
                alert(errorData.error || "Brisanje nije uspešno!");
                return;
            }
            const data = await res.json();
            
            if(data.success){
                await refreshUsers();
            }
        }catch(err){
            console.error(err);
            alert("Greška prilikom brisanja korisnika!");
        }

    }



    return(
        <div className="overflow-x-auto">
            <table className="mx-auto border-collapse border border-gray-300">
            <thead className="bg-purple-300">
            <tr>
                <th className="px-6 py-4 text-center">Ime</th>
                <th className="px-6 py-4 text-center">Prezime</th>
                <th className="px-6 py-4 text-center">Username</th>
                <th className="px-6 py-4 text-center">Email</th>
                <th className="px-6 py-4 text-center">Adresa</th>
                <th className="px-6 py-4 text-center">Uloga</th>
                <th className="px-6 py-4 text-center">Kreiran</th>
                <th className="px-6 py-4 text-center">Brisanje</th>
                <th className="px-6 py-4 text-center">Promena uloge</th>
            </tr>
            </thead>

            <tbody className="bg-purple-200">
            {users.map((u) => (
                <tr key={u.id}>
                    <td className="px-6 py-2 text-center">{u.ime}</td>
                    <td className="px-6 py-2 text-center">{u.prezime}</td>
                    <td className="px-6 py-2 text-center">{u.username}</td>
                    <td className="px-6 py-2 text-center">{u.email}</td>
                    <td className="px-6 py-2 text-center">{u.adresa}</td>
                    <td className="px-6 py-2 text-center">{u.uloga}</td>
                    <td className="px-6 py-2 text-center">{new Date(u.createdAt).toLocaleDateString()}</td>
                    
                    <td className="px-6 py-2 text-center">
                        <button
                        onClick={()=> handleDelete(u.id)}
                        className="bg-purple-600 text-white hover:bg-pink-400 font-bold px-2 py-1 rounded"
                        >
                            Obriši korisnika
                    </button>
                    </td>
                    <td className="px-6 py-2 text-center">
                        <button
                        onClick={()=> handleUpdateKorisnik(u.id)}
                        className="bg-purple-600 text-white hover:bg-pink-400 font-bold px-2 py-1 rounded"
                        >
                            Promeni ulogu
                    </button>
                    </td>
                </tr>
            ))}
            </tbody>    
            </table>    
        </div>
    );
}
