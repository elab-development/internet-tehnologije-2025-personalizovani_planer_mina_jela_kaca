"use client"

import { index } from "drizzle-orm/gel-core";
import React, { useContext, useState } from "react";
import { createContext } from "react";

export type Planer = {
    tip: "planer";
    data: {
        dimenzije: string | null;
        brojStranica: string | null;
        vrstaStranica: string | null;
        korice: string | null;
        koriceIzgled: string | null;
        bojaStranica: string | null;
        vrstaKalendara: string | null;
        kalendar: string | null;
        posveta: string;
        cena: number;
        kolicina: number;
        cenaKol: number;
    };
};

export type Stiker = {
    tip: "stiker";
    data: {
        opis: string;
        cena: number;
        kolicina: number;   //jos ne dobija ove vrednosti!!
        cenaKol: number;
    };
};

export type KorpaProizvod = Planer | Stiker;

type KorpaContextType = {
    korpa: KorpaProizvod[];
    addProizvod: (proizvod: KorpaProizvod) => void;
    removeProizvod: (index: number) => void;
    removeAllProizvod: () => void;
};

const KorpaContext = createContext<KorpaContextType | undefined>(undefined);

export function KorpaProvider({children}: {children: React.ReactNode }){

    const [korpa, setKorpa] = useState<KorpaProizvod[]>([]);

    function addProizvod(proizvod: KorpaProizvod){
        setKorpa((prev)=>{ 
            if(proizvod.tip === "stiker"){
                const index = prev.findIndex((item)=>
                    item.tip === "stiker" &&
                    item.data.opis === proizvod.data.opis //da li vec postoji
                );
                if(index !== -1){ //ako je nasao
                    const updated = [...prev];
                    const stikerPostojeci = updated[index] as Stiker;
                    const novaKol = stikerPostojeci.data.kolicina + 1;
                    updated[index] = {
                        ...stikerPostojeci,
                        data:{
                            ...stikerPostojeci.data,
                            kolicina: novaKol,
                            cenaKol: stikerPostojeci.data.cena * novaKol,
                        },
                    };
                    return updated;
                }
            }  
            return [...prev, proizvod]; //ako nije stiker koji vec postoji
        });
    }

    function removeProizvod(index: number){
        setKorpa((prev) => prev.filter((_,i)=> i !== index));
    }

    function removeAllProizvod(){
        setKorpa([]);
    }

    return(
        <KorpaContext.Provider value={{korpa, addProizvod, removeProizvod, removeAllProizvod}}>
            {children}
        </KorpaContext.Provider>
    );
}

export function useKorpa(){
    const context = useContext(KorpaContext);
    if(!context) throw new Error("useKorpa mora biti unutar KorpaProvider");
    return context;
}
