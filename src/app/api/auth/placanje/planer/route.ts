import { db } from "@/db";
import { planerTabela } from "@/db/schema";
import { NextResponse } from "next/server";


type Planer = {
    //id od Proizvod tabele - generisace se ...
    posveta: string | null;
    brojStranica: number;
    dimenzije: "A6" | "B6" | "A5" | "A4";
    bojaStranica: "bela" | "svetlo roze" | "svetlo plava" | "svetlo zelena"| "svetlo ljubičasta";
    vrstaKalendara: string;
    kalendar: string | null;
    vrstaStranica: "linije" | "kocke" | "tacke" | "prazno";
    cena: number;
    proizvodID: string;
    koriceID: string;
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}

export async function POST(req: Request){

    const {posveta, brojStranica, dimenzije, bojaStranica, vrstaKalendara, kalendar, 
        vrstaStranica, cena, proizvodID, koriceID} = (await req.json()) as Planer;

    if(!brojStranica || !dimenzije || !bojaStranica || !vrstaKalendara || !vrstaStranica || !cena 
        || !proizvodID || !koriceID){
            return NextResponse.json({error: "Nema podataka!"}, {status: 400})
    }


    const [p] = await db.insert(planerTabela)
        .values({posveta, brojStranica, dimenzije, bojaStranica, vrstaKalendara, kalendar, vrstaStranica,
            cena,proizvodID, koriceID})
        .returning({id: planerTabela.proizvodID});


    const res = NextResponse.json(p)
    return res;

}