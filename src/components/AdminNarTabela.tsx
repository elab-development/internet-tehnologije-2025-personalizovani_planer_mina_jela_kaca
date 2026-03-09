"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Nar = {
    id: string;
    adresa: string;
    pttBroj: number;
    datum: string | Date;
    ukupnaCena: number;
    status: "u obradi" | "potvrdjena" | "odbijena";
    korisnikID: string;
};

type Korisnik = {
    id: string;
    email: string;
    username: string;
};

type Props = {
    nar: Nar[]; // sve narudžbenice prosleđene sa servera
    kID: string; // selektovani korisnik id / "sve"
    korisnici: Korisnik[];
};

export function AdminNarTabela({ nar, kID, korisnici }: Props) {
    const [filteredNar, setFilteredNar] = useState<Nar[]>([]);
    const router = useRouter();

    // filtriranje nar po kID
    useEffect(() => {
        if (kID === "sve") {
            setFilteredNar(nar);
        } else {
            setFilteredNar(nar.filter((n) => n.korisnikID === kID));
        }
    }, [kID, nar]);

    const handleDelete = async (id: string) => {
        if (!confirm("Da li ste sigurni da želite da obrišete narudžbenicu?")) return;

        const res = await fetch("/api/auth/admin/nar-brisanje", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ narID: id }),
        });

        if (res.ok) {
            setFilteredNar((prev) => prev.filter((n) => n.id !== id));
        } else {
            alert("Greška pri brisanju narudžbenice!");
        }
    };
    
    return (
        <div className="overflow-x-auto">
        <table className="mx-auto border-collapse border border-gray-300">
            <thead className="bg-purple-300">
            <tr>
                <th className="px-6 py-4 text-center">Email korisnika</th>
                <th className="px-6 py-4 text-center">Adresa</th>
                <th className="px-6 py-4 text-center">PTT Broj</th>
                <th className="px-6 py-4 text-center">Datum</th>
                <th className="px-6 py-4 text-center">Ukupna cena</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Promena statusa</th>
                <th className="px-6 py-4 text-center">Detalji</th>
                <th className="px-6 py-4 text-center">Brisanje</th>
            </tr>
            </thead>
            <tbody className="bg-purple-200">
            {filteredNar.map((n) => {
                const korisnik = korisnici.find((k) => k.id === n.korisnikID);
                return (
                <tr key={n.id}>
                    <td className="px-6 py-2 text-center">{korisnik?.email ?? "Nepoznat"}</td>
                    <td className="px-6 py-2 text-center">{n.adresa}</td>
                    <td className="px-6 py-2 text-center">{n.pttBroj}</td>
                    <td className="px-6 py-2 text-center">{new Date(n.datum).toLocaleDateString()}</td>
                    <td className="px-6 py-2 text-center">{n.ukupnaCena}</td>
                    <td className="px-6 py-2 text-center">{n.status}</td>
                    <td className="px-6 py-2 text-center">
                        <select
                            value={n.status}
                            onChange={async (e) => {
                                const noviStatus = e.target.value as "u obradi" | "potvrdjena" | "odbijena";

                                const res = await fetch("/api/auth/admin/nar", {
                                    method: "PUT",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ id: n.id, status: noviStatus }),
                                });

                                if (res.ok) {
                                    //refresh!!!
                                    setFilteredNar((prev) =>
                                        prev.map((item) => (item.id === n.id ? { ...item, status: noviStatus } : item))
                                    );
                                } else {
                                    alert("Greška pri promeni statusa!");
                                }
                            }}
                            className="border rounded px-2 py-1"
                        >
                            <option value="u obradi">u obradi</option>
                            <option value="potvrdjena">potvrdjena</option>
                            <option value="odbijena">odbijena</option>
                        </select>
                        </td>
                    <td className="px-6 py-2 text-center">
                        <button
                            onClick={() => router.push(`/faktura?id=${n.id}`)}
                            className="bg-purple-600 text-white hover:bg-pink-500 font-bold px-2 py-1 rounded"
                        >
                            Vidi detalje
                        </button>
                    </td>
                    <td className="px-6 py-2 text-center">
                        <button
                            onClick={() => handleDelete(n.id)}
                            className="bg-pink-600 text-white hover:bg-pink-700 font-bold px-2 py-1 rounded"
                        >
                            Obriši
                        </button>
                    </td>
                </tr>
                );
            })}
            </tbody>
        </table>
        </div>
    );
}