"use client"

import React, { useState } from "react";
import { redirect } from "next/navigation";
import { KastomizacijaClient } from "./KastomizacijaClient";
import { useKorpa } from "@/app/context/KorpaContext";

type TipToken = {
    token: string | null;
};

export function KastomizacijaClientWrapper({token}: TipToken){

    const { addProizvod } = useKorpa();

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
            alert("Morate popuniti sva polja!! [Osim posvete]");
            return;
        }

        //izracunaj cenu:
        let cenaDimenzije: number = 0;
        switch(dimenzije){
            case "A6": cenaDimenzije = 600;
                break;
            case "B6": cenaDimenzije = 700;
                break;
            case "A5": cenaDimenzije = 800;
                break;
            case "A4": cenaDimenzije = 900;
                break;
        }

        let cenaBrojStr: number = 0;
        switch(brojStranica){
            case "180": cenaBrojStr = cenaDimenzije * 2;
                break;
            case "280": cenaBrojStr = cenaDimenzije * 3;
                break;
            case "340": cenaBrojStr = cenaDimenzije * 4;
                break;
        }

        let cena: number = 0;
        switch(korice){
            case "patern": cena = cenaBrojStr + 250.99;
                break;
            case "boja": cena = cenaBrojStr + 150.99;
                break;
            case "koža": cena = cenaBrojStr + 450.99;
                break;
        }
               

        const planerData = {
            dimenzije, brojStranica, vrstaStranica, korice, 
            koriceIzgled: korice === "koža" ? "" : koriceIzgled,
            bojaStranica, vrstaKalendara,
            kalendar: vrstaKalendara === "nedatumiran" ? "" : kalendar,
            posveta, cena
        };

        console.log(planerData);
        addProizvod({
            tip: "planer",
            data: planerData
        });
        redirect("/korpa");

    }


    return(
        <main className="min-h-screen bg-gray-100 font-sans bg-purple-100 flex flex-col items-center gap-4">
            <div className="py-5 text-center">
                <h1 className="text-2xl font-bold mb-1 text-purple-800">NAPRAVI SVOJ</h1>
                <h1 className="text-4xl font-bold mb-4 text-pink-700">PERSONALIZOVANI PLANER</h1>
            </div>

            {/* DIMENZIJE, BROJ STRANICA, VRSTA STRANICA */}
            <div className="flex flex-col items-center border-4 border-dotted border-purple-300 rounded-lg py-8 w-full max-w-6xl px-6 gap-4">
                <h2 className="text-lg font-bold text-purple-800">DIMENZIJE:</h2>
                <KastomizacijaClient type="dimenzije" value={dimenzije} onChange={setDimenzije} />

                <h2 className="text-lg font-bold text-purple-800">BROJ STRANICA:</h2>
                <KastomizacijaClient type="brojStranica" value={brojStranica} onChange={setBrojStranica} /> 

                <h2 className="text-lg font-bold text-purple-800">VRSTA STRANICA(LINIJA):</h2>
                <KastomizacijaClient type="vrstaStranica" value={vrstaStranica} onChange={setVrstaStranica} /> 

                <h2 className="font-semibold text-purple-800 pt-4">Posveta (opcionalno):</h2> 
                <input 
                    type="text" 
                    maxLength={30} 
                    placeholder="Unesite tekst..."
                    className="border-b-2 border-purple-300 focus:border-purple-600 outline-none w-full text-center py-2 transition-colors" 
                    value={posveta}
                    onChange={(e) => setPosveta(e.target.value)}
                />
            </div>

            {/* KORICE I BOJA STRANA */}
             <div className="flex flex-col items-center border-4 border-dotted border-purple-300 rounded-lg py-8 w-full max-w-6xl px-6 gap-4">
                <h2 className="text-lg font-bold text-purple-800">KORICE:</h2>
                <KastomizacijaClient 
                    type="korice" 
                    value={korice} 
                    subValue={koriceIzgled} 
                    onChange={setKorice} 
                    onSubChange={setKoriceIzgled} 
                />

                <h2 className="text-lg font-bold text-purple-800">BOJA STRANICA(LISTOVA):</h2>
                <KastomizacijaClient type="bojaStranica" value={bojaStranica} onChange={setBojaStranica} />
            </div>

            {/* VRSTA KALENDARA */}
             <div className="flex flex-col items-center border-4 border-dotted border-purple-300 rounded-lg py-8 w-full max-w-6xl px-6 gap-4">
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
            <form onSubmit={dodajUKorpu} className="text-center pt-8 pb-8">
                <button
                    type="submit"
                    className="bg-purple-600 hover:bg-pink-500 text-white rounded-lg px-3 py-3">
                    Dodaj u korpu!
                </button>
            </form>
        </main>

    );


}

