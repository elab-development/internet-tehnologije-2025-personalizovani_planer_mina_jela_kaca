"use client"

import { KorpaProizvod, useKorpa } from "@/app/context/KorpaContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import KorisnikInfo from "./KorisnikInfo";

type Korisnik = {
    id: string;
    username: string;
    email: string;
    ime: string;
    prezime: string;
    adresa: string;
}

type KorisnikProps = {
    k: Korisnik;
}

export default function PlacanjeClient({k}:KorisnikProps){

    const {korpa} = useKorpa();

    //?
    const router = useRouter();

    //da se ne bi menjalo stanje tokom renderovanja komponente --> koristimo useEffect
    useEffect(() => {       
        if (korpa.length === 0) {
            router.replace("/korpa");
        }
    }, [korpa, router]);
    //ako pokusa da renderuje dok traje router.replace(redirect)
    if (korpa.length === 0) {
        return null;
    }

    const ukupno = korpa.reduce((sum, item) => sum + item.data.cena, 0);
    const ukupnoString = ukupno.toFixed(2);

    return(
        <div>
        <section className="bg-violet-200 mx-auto px-4 py-12 grid gap-6 rounded-3xl w-200">
            <div className="w-192">
                {korpa.map((item: KorpaProizvod, index: number) => (
                    <div key={index} className="bg-purple-100 rounded-lg shadow p-6 mb-3 flex flex-col justify-between">
                        <div>
                            {item.tip === "planer" && (
                            <>
                                <h2 className="font-bold text-purple-800 text-xl text-left">Planer</h2>
                                <p className="text-left"><strong>Dimenzije: </strong>{item.data.dimenzije} {" "}
                                    <strong>Broj stranica: </strong>{item.data.brojStranica} {" "}
                                    <strong>Vrsta stranica: </strong>{item.data.vrstaStranica} {" "}
                                    <strong>Korice: </strong>{item.data.korice} {" "}
                                    <strong>Korice izgled: </strong>{item.data.koriceIzgled || "-"} {" "}
                                    <strong>Boja stranica: </strong>{item.data.bojaStranica} {" "}
                                </p>
                                <p className="text-left">
                                    <strong>Vrsta kalendara: </strong>{item.data.vrstaKalendara} {" "}
                                    <strong>Kalendar: </strong>{item.data.kalendar || "-"} {" "}
                                    <strong>Posveta: </strong>{item.data.posveta || "-"}
                                </p>
                                        
                                <p className="font-semibold text-right text-lg"><strong className="text-pink-600">Cena: </strong>{item.data.cena} RSD</p>
                            </>
                            )}
                            {item.tip === "stiker" && (
                            <>
                                <h2 className="font-bold text-purple-800 text-xl text-left">Stiker</h2>
                                <p className="text-left"><strong>Opis: </strong>{item.data.opis}</p>
                                <p className="font-semibold text-right text-lg"><strong className="text-pink-600">Cena: </strong>{item.data.cena} RSD</p>
                            </>
                            )}

                        </div>            
                    </div>  
                ))}

                <div className="bg-purple-100 rounded-lg shadow p-6 mb-3 w-80 ml-auto">
                    <p className="font-bold text-lg text-pink-600">Ukupna cena: <i className="text-gray-800">{ukupnoString}</i></p>
                </div>
            </div>
        </section>
        
        <section className=" mx-auto px-4 py-12 grid gap-6 rounded-3xl w-200 mt-4">
                <KorisnikInfo k={k}></KorisnikInfo>
        </section>
        
        
        
        <button
            className="w-70 bg-purple-600 rounded font-bold text-2xl text-white hover:bg-pink-500 py-2 px-3 mt-4">
            {/*NAKON STO KLIKNE -- REFRESH!! DA IZBACI IZ KORPE STVARI!!!! */}
            PORUČI
        </button>
        </div>
    );
}