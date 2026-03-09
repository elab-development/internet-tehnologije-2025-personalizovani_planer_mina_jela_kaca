"use client"

import { RadioButton } from "@/components/RadioButton";
import { RadioButtonImage } from "@/components/RadioButtonImage";  


type KastomizacijaClientTip = {  //koji tip radioButton-a se trazi da vrati
    type: "dimenzije" | "brojStranica" | "vrstaStranica" | "korice" | "bojaStranica" | "vrstaKalendara";

    value: string | null;
    subValue?: string | null;
    onChange : (value: string) => void;
    onSubChange? : (value: string | null) => void; //null-able
}


export function KastomizacijaClient({type, value, subValue, onChange, onSubChange} : KastomizacijaClientTip){

    const elementiDimenzije = [
        { id: 1, label: "105×148 mm (A6)", value: "A6" },
        { id: 2, label: "125×176 mm (B6)", value: "B6" },
        { id: 3, label: "148×210 mm (A5)", value: "A5" },
        { id: 4, label: "210×297 mm (A4)", value: "A4" }
    ];

    const elementiBrStranica = [
        { id: 5, label: "90 listova / 180 stranica", value: "180" },   //pazi na id!
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

    const elementiKoricePatern = [
        { id: 15, label: "flamingo", value: "flamingo" },   //pazi na id!
        { id: 16, label: "cveće", value: "cveće" },
        { id: 17, label: "svemir", value: "svemir" },
        { id: 18, label: "lišće", value: "lišće" },
        { id: 19, label: "geometrija", value: "geometrija" },
        //...
    ];

    const elementiKoriceBoja = [
        { id: 25, label: "bela", value: "bela" },   //pazi na id!
        { id: 26, label: "roze", value: "roze" },
        { id: 27, label: "plava", value: "plava" },
        { id: 28, label: "ljubičasta", value: "ljubičasta" },
        { id: 29, label: "zelena", value: "zelena" },
    ];

    const elementiBojaStranica = [
        { id: 30, label: "bela", value: "bela" },
        { id: 31, label: "svetlo roze", value: "svetlo roze" },
        { id: 32, label: "svetlo plava", value: "svetlo plava" },
        { id: 33, label: "svetlo zelena", value: "svetlo zelena" },
        { id: 34, label: "svetlo ljubičasta", value: "svetlo ljubičasta" },
    ];
    
    const elementiVstraKalendara = [
        { id: 36, label: "nedatumiran", value: "nedatumiran" },
        { id: 37, label: "evropski (dd.MM.yyyy.)", value: "evropski" },
        { id: 38, label: "američki (MM/dd/yyyy)", value: "američki" },
        { id: 39, label: "kineski (yyyy-MM-dd)", value: "kineski" },
    ];
    const elementiKalendar = [
        { id: 40, label: "mart 2026", value: "mart 2026" },
        { id: 41, label: "april 2026", value: "april 2026" },
        { id: 42, label: "maj 2026", value: "maj 2026" },
        { id: 43, label: "jun 2026", value: "jun 2026" },
        { id: 44, label: "jul 2026", value: "jul 2026" },
        { id: 45, label: "avgust 2026", value: "avgust 2026" },
        { id: 46, label: "septembar 2026", value: "septembar 2026" },
        { id: 47, label: "oktobar 2026", value: "oktobar 2026" },
        { id: 48, label: "novembar 2026", value: "novembar 2026" },
        { id: 49, label: "decembar 2026", value: "decembar 2026" },
        { id: 50, label: "januar 2027", value: "januar 2027" },
        { id: 51, label: "februar 2027", value: "februar 2027" },
    ];

    if (type === "dimenzije"){
        return(
            <RadioButton
                elements = {elementiDimenzije}
                selectedValue = {value} //prosledjeno ...
                onChange = {onChange}
            />
        );
    }
    if (type === "brojStranica"){
        return(
            <RadioButton
                elements = {elementiBrStranica}
                selectedValue = {value}
                onChange = {onChange}
            />
        );
    }
    if (type === "vrstaStranica"){
        return(
            <RadioButton
                elements = {elementiVrstaStranica}
                selectedValue = {value}
                onChange = {onChange}
            />
        );
    }
    if (type === "korice"){
        return(
          <>
            <RadioButtonImage
                elements={elementiKorice}
                selectedValue={value}
                onChange={(val) => {
                    onChange(val);
                    if (onSubChange) onSubChange(null); //resetuje vrednost
                }}
            />
                {value === "patern" && onSubChange && (
                    <RadioButtonImage
                        elements={elementiKoricePatern}
                        selectedValue={subValue ?? null}
                        onChange={onSubChange}
                    />
                )}

                {value === "boja" && onSubChange && (
                    <RadioButtonImage
                        elements={elementiKoriceBoja}
                        selectedValue={subValue ?? null}
                        onChange={onSubChange}
                    />
                )}
          </>
        );
    }
    if (type === "bojaStranica"){
        return(
            <RadioButton
                elements = {elementiBojaStranica}
                selectedValue = {value}
                onChange = {onChange}
            />
        );
    }
    if (type === "vrstaKalendara"){
        return(
            <>
                <RadioButton
                elements = {elementiVstraKalendara}
                selectedValue = {value}
                onChange = {(val) =>{
                    onChange(val);
                    if (onSubChange) onSubChange(null);
                }}
                />
                {value && value !== "nedatumiran" && onSubChange &&(
                    <RadioButton
                        elements={elementiKalendar}
                        selectedValue={subValue ?? null}
                        onChange={onSubChange}
                    />
                )}
            </>
        );
    }

    return null;

}