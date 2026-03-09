"use client";

import AdminCharts from "@/components/AdminCharts";
import { AdminKorisniciTabela } from "@/components/AdminKorisniciTabela";
import { AdminNarTabela } from "@/components/AdminNarTabela";
import ComboBox from "@/components/ComboBox";
import Link from "next/link";
import { useState } from "react";

type Korisnik = {
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
  korisnici: Korisnik[];
  narudzbenice: any[];
  k: { id: string; ime: string };
};

export default function AdminClient({ korisnici, narudzbenice, k }: Props) {
    const [users, setUsers] = useState(korisnici);
    const [selectedID, setSelectedID] = useState<string>("sve");

    const handleUserDelete = (updatedUsers: Korisnik[]) => {
        setUsers(updatedUsers);
    };

    return (
        <div className="flex flex-col items-center">
            
            <AdminCharts />

            <h2 className="text-purple-700 text-3xl">KORISNICI:</h2>
            <AdminKorisniciTabela pocetniKorisnici={users} k={k} onDelete={handleUserDelete} />

            <h2 className="text-purple-700 text-3xl">NARUDŽBENICE:</h2>
            <div className="py-4">
                <ComboBox korisnici={users} onChange={setSelectedID} />
            </div>
            
            <AdminNarTabela nar={narudzbenice} kID={selectedID} korisnici={users} />
        </div>
    );
}