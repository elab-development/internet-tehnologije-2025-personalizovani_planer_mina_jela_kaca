"use client"

import { useState } from "react"
import { RadioButton } from "./RadioButton"; 

type KastomizacijaClientTip = {  //koji tip radioButton-a se trazi da vrati
    type: "dimenzija" | "brStranica";
}


export function KastomizacijaClient({type} : KastomizacijaClientTip){

    const [dimenzija, setDimenzija] = useState<string|null>(null);
    const [brStranica, setBrStranica] = useState<string | null>(null);

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

    return null;

}