import { db } from "@/db";
import { stavkaNarudzbeniceTabela } from "@/db/schema";
import { NextResponse } from "next/server";

type Stavka = {
    //id
    kolicina: number;
    cena: number;
    narudzbenicaID: string;
    proizvodID: string;
}

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

    const {kolicina, cena, narudzbenicaID, proizvodID} = (await req.json()) as Stavka;

    if(!cena || !narudzbenicaID || !proizvodID){
        return NextResponse.json({error: "Nema podataka!"}, {status: 400})
    }


    const [sn] = await db.insert(stavkaNarudzbeniceTabela)
        .values({kolicina, cena, narudzbenicaID, proizvodID})
        .returning({id: stavkaNarudzbeniceTabela.id});


    const res = NextResponse.json(sn)
    return res;

}