"use client"

import { useState } from "react"
import { RadioButton } from "./RadioButton";
import { RadioButtonImage } from "./RadioButtonImage";  
import { db } from "@/db";

type KastomizacijaClientTip = {  //koji tip radioButton-a se trazi da vrati
    type: "dimenzija" | "brStranica" | "vrstaStranica" | "korice";
}


export function KastomizacijaClient({type} : KastomizacijaClientTip){

    const [dimenzija, setDimenzija] = useState<string|null>(null);
    const [brStranica, setBrStranica] = useState<string | null>(null);
    const [vrstaStranica, setVrstaStranica] = useState<string | null>(null);
    const [korice, setKorice] = useState<string | null> (null);

    const elementiDimenzije = [
        { id: 1, label: "105×148 mm (A6)", value: "A6" },
        { id: 2, label: "125×176 mm (B6)", value: "B6" },
        { id: 3, label: "148×210 mm (A5)", value: "A5" },
        { id: 4, label: "210×297 mm (A4)", value: "A4" }
    ];

    const elementiBrStranica = [
        { id: 5, label: "90 listova / 180 stranica", value: "90" },   //pazi na id!
        { id: 6, label: "140 listova / 280 stranica", value: "280" },
        { id: 7, label: "170 listova / 340 stranica", value: "340" },
    ];

    const elementiVrstaStranica = [ //ne cita ih iz baze kao koje su sve moguce :P -- isto i za dimenzije
        { id: 8, label: "linije", value: "linije" },
        { id: 9, label: "kocke", value: "kocke" },
        { id: 10, label: "tacke", value: "tacke" },
        { id: 11, label: "prazno", value: "prazno" }
    ];

    const elementiKorice = [
        { id: 12, label: "patern", value: "patern" },   //pazi na id!
        { id: 13, label: "boja", value: "boja" },
        { id: 14, label: "koža", value: "koža" },
    ];

    if (type === "dimenzija"){
        return(
            <RadioButton
                elements = {elementiDimenzije}
                selectedValue = {dimenzija}
                onChange = {setDimenzija}
            />
        );
    }
    if (type === "brStranica"){
        return(
            <RadioButton
                elements = {elementiBrStranica}
                selectedValue = {brStranica}
                onChange = {setBrStranica}
            />
        );
    }
    if (type === "vrstaStranica"){
        return(
            <RadioButton
                elements = {elementiVrstaStranica}
                selectedValue = {vrstaStranica}
                onChange = {setVrstaStranica}
            />
        );
    }
    if (type === "korice"){
        return(
            <RadioButtonImage
                elements={elementiKorice}
                selectedValue={korice}
                onChange={setKorice}
            />
        );
    }

    return null;

}