import { db } from "@/db";
import { narudzbenicaTabela } from "@/db/schema";
import { NextResponse } from "next/server";


type Narudzbenica = {
    adresa: string;
    pttBroj: number;
    ukupnaCena: number;
    korisnikID: string;
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

    const {adresa, pttBroj, ukupnaCena, korisnikID} = (await req.json()) as Narudzbenica;

    if(!adresa || !pttBroj || !ukupnaCena || !korisnikID){
        return NextResponse.json({error: "Nema podataka!"}, {status: 400})
    }


    const [n] = await db.insert(narudzbenicaTabela)
        .values({adresa, pttBroj, ukupnaCena, status: "u obradi", korisnikID})
        .returning({id: narudzbenicaTabela.id});


    const res = NextResponse.json(n)
    return res;

}