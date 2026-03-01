"use client"

import { KorpaProizvod, useKorpa } from "@/app/context/KorpaContext"
import React from "react"

export default function KorpaClient(){
    const {korpa, removeProizvod} = useKorpa();

    const ukupno = korpa.reduce((sum, item) => sum + item.data.cena, 0);

    if(korpa.length === 0){
        return <p className="text-gray-900">Korpa je prazna \(^-^)/</p>
    }

    return(
        <div>
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
                        
                        <p className="font-semibold text-right text-lg"><strong className="text-pink-500">Cena: </strong>{item.data.cena} RSD</p>
                     </>
                    )}
                    {item.tip === "stiker" && (
                     <>
                        <h2 className="font-bold text-purple-800">Stiker</h2>
                        <p className="text-left"><strong>Opis: </strong>{item.data.opis}</p>
                        <p className="font-semibold text-right text-lg"><strong className="text-pink-500">Cena: </strong>{item.data.cena} RSD</p>
                     </>
                    )}
                  </div>
                
                <button
                    onClick={() => removeProizvod(index)}
                    className="bg-purple-400 text-white px-3 py-1 rounded h-fit hover:bg-purple-500">
                    Ukloni proizvod iz korpe
                </button>

                </div>
                
            ))}

            <div className="mt-6 p-4 border-3 border-dotted border-purple-800 rounded-lg bg-purple-100">
                <p className="text-xl font-bold text-grey-900"> <strong className="text-pink-600">Ukupno: </strong>{ukupno} RSD</p>
                <button className="mt-2 bg-pink-500 hover:bg-pink-700 text-white px-3 py-2 rounded w-full">
                    IDI NA PLAĆANJE (ONCLICK NIJE GOTOV)
                </button>
            </div>

        </div>
    );

}