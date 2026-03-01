"use client"

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
    };
};

export type Stiker = {
    tip: "stiker";
    data: {
        opis: string;
        cena: number;
    };
};

export type KorpaProizvod = Planer | Stiker;

type KorpaContextType = {
    korpa: KorpaProizvod[];
    addProizvod: (proizvod: KorpaProizvod) => void;
    removeProizvod: (index: number) => void;
};

const KorpaContext = createContext<KorpaContextType | undefined>(undefined);

export function KorpaProvider({children}: {children: React.ReactNode }){

    const [korpa, setKorpa] = useState<KorpaProizvod[]>([]);

    function addProizvod(proizvod: KorpaProizvod){
        setKorpa((prev)=>[...prev, proizvod]);
    }

    function removeProizvod(index: number){
        setKorpa((prev) => prev.filter((_,i)=> i !== index));
    }

    return(
        <KorpaContext.Provider value={{korpa, addProizvod, removeProizvod}}>
            {children}
        </KorpaContext.Provider>
    );
}

export function useKorpa(){
    const context = useContext(KorpaContext);
    //JSON
    if(!context) throw new Error("useKorpa mora biti unutar KorpaProvider");
    return context;
}
