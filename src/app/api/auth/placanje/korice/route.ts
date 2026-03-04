import { db } from "@/db";
import { koriceTabela } from "@/db/schema";
import { NextResponse } from "next/server";

type Korice = {
    //id treba da se generise
    tip: "patern" | "boja" | "koža";
    izgled: string | null;
}

export async function POST(req: Request){

    const {tip, izgled} = (await req.json()) as Korice;

    if(!tip){
        return NextResponse.json({error: "Nema podataka!"}, {status: 400})
    }

    
    const [k] = await db.insert(koriceTabela)
        .values({tip, izgled})
        .returning({id: koriceTabela.id, tip: koriceTabela.tip, izgled: koriceTabela.izgled})


    const res = NextResponse.json(k)
    return res;

}