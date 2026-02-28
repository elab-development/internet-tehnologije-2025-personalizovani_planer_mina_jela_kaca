"use client"

import React, { useState } from "react";
import { redirect } from "next/navigation";
import { KastomizacijaClient } from "./KastomizacijaClient";

type TipToken = {
    token: string | null;
};

export function KastomizacijaClientWrapper({token}: TipToken){

    const [dimenzije, setDimenzije] = useState<string|null>(null);
    const [brojStranica, setBrojStranica] = useState<string|null>(null);
    const [vrstaStranica, setVrstaStranica] = useState<string|null>(null);
    const [korice, setKorice] = useState<string|null>(null);
    const [koriceIzgled, setKoriceIzgled] = useState<string|null>(null);
    const [bojaStranica, setBojaStranica] = useState<string|null>(null);
    const [vrstaKalendara, setVrstaKalendara] = useState<string|null>(null);
    const [kalendar, setKalendar] = useState<string|null>(null);
    const [posveta, setPosveta] = useState<string>("");

                        // •`_´•
    function dodajUKorpu(e: any){
        e.preventDefault();

        if(!token){
            redirect("/log-in");
            return;
        }

        //VALIDACIJA AAA
        if(
            !dimenzije || !brojStranica || !vrstaStranica || !korice || 
            (korice !== "koža" && !koriceIzgled) || !bojaStranica || !vrstaKalendara ||
            (vrstaKalendara !== "nedatumiran" && !kalendar)
        ){
            //JSON? ne alert??
            alert("Sva obavezna polja moraju biti izabrana (sve osim posvete)");
            return;
        }

        //izracunaj cenu: cena = ...

        const planer = {
            dimenzije, brojStranica, vrstaStranica, korice, 
            koriceIzgled: korice === "koža" ? "" : koriceIzgled,
            bojaStranica, vrstaKalendara,
            kalendar: vrstaKalendara === "nedatumiran" ? "" : kalendar,
            posveta
        };

        console.log(planer);
        //COOKIE momenat
        //redirect u korpu momenat

    }


    return(
        <main className="min-h-screen bg-gray-100 font-sans bg-purple-100 flex flex-col items-center gap-4">
            <div className="py-10 text-center">
                <h1 className="text-4xl font-bold mb-1 text-purple-800">NAPRAVI SVOJ</h1>
                <h1 className="text-4xl font-bold mb-4 text-pink-700">PERSONALIZOVANI PLANER</h1>
            </div>

            {/* DIMENZIJE, BROJ STRANICA, VRSTA STRANICA */}
            <div className="flex flex-col items-center gap-4 border-4 border-dotted border-purple-500 rounded-lg py-8 px-20 w-full">
                <h2 className="text-lg font-bold text-purple-800">DIMENZIJE:</h2>
                <KastomizacijaClient type="dimenzije" value={dimenzije} onChange={setDimenzije} />

                <h2 className="text-lg font-bold text-purple-800">BROJ STRANICA:</h2>
                <KastomizacijaClient type="brojStranica" value={brojStranica} onChange={setBrojStranica} /> 

                <h2 className="text-lg font-bold text-purple-800">VRSTA STRANICA(LINIJA):</h2>
                <KastomizacijaClient type="vrstaStranica" value={vrstaStranica} onChange={setVrstaStranica} /> 

                <h2 className="font-semibold text-purple-800 pt-4">Posveta:</h2> 
                <input 
                    type="text" 
                    maxLength={30} 
                    className="border-1 border-purple-800 w-full" 
                    value={posveta}
                    onChange={(e) => setPosveta(e.target.value)}
                />
            </div>

            {/* KORICE I BOJA STRANA */}
            <div className="flex flex-col items-center gap-4 border-4 border-dotted border-purple-500 rounded-lg py-8 px-20 w-full">
                <h2 className="text-lg font-bold text-purple-800">KORICE:</h2>
                <KastomizacijaClient 
                    type="korice" 
                    value={korice} 
                    subValue={koriceIzgled} 
                    onChange={setKorice} 
                    onSubChange={setKoriceIzgled} 
                />

                <h2 className="text-lg font-bold text-purple-800">BOJA STRANICA:</h2>
                <KastomizacijaClient type="bojaStranica" value={bojaStranica} onChange={setBojaStranica} />
            </div>

            {/* VRSTA KALENDARA */}
            <div className="flex flex-col items-center gap-4 border-4 border-dotted border-purple-500 rounded-lg py-8 px-20 w-full">
                <h2 className="text-lg font-bold text-purple-800">VRSTA KALENDARA:</h2>
                <KastomizacijaClient 
                    type="vrstaKalendara" 
                    value={vrstaKalendara} 
                    subValue={kalendar} 
                    onChange={setVrstaKalendara} 
                    onSubChange={setKalendar} 
                />
            </div>

            {/* DUGME */}
            <form onSubmit={dodajUKorpu} className="text-center pb-4">
                <button
                    type="submit"
                    className="bg-purple-600 hover:bg-pink-500 text-white rounded-lg px-3 py-3">
                    Dodaj u korpu!
                </button>
            </form>
        </main>

    );


}


