import { db } from "@/db";
import { stavkaNarudzbeniceTabela } from "@/db/schema";
import { NextResponse } from "next/server";

type Stavka = {
    //id
    cena: number;
    narudzbenicaID: string;
    proizvodID: string;
}

export async function POST(req: Request){

    const {cena, narudzbenicaID, proizvodID} = (await req.json()) as Stavka;

    if(!cena || !narudzbenicaID || !proizvodID){
        return NextResponse.json({error: "Nema podataka!"}, {status: 400})
    }


    const [sn] = await db.insert(stavkaNarudzbeniceTabela)
        .values({cena, narudzbenicaID, proizvodID})
        .returning({id: stavkaNarudzbeniceTabela.id});


    const res = NextResponse.json(sn)
    return res;

}