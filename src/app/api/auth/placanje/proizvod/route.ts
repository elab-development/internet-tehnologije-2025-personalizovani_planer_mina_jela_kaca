import { db } from "@/db";
import { proizvodTabela } from "@/db/schema";
import { NextResponse } from "next/server";

type Proizvod = {
    //id treba da se generise
    tip: "planer" | "stiker";
}

export async function POST(req: Request){

    const {tip} = (await req.json()) as Proizvod;

    if(!tip){
        return NextResponse.json({error: "Nema podataka!"}, {status: 400})
    }

    
    const [p] = await db.insert(proizvodTabela)
        .values({tip})
        .returning({id: proizvodTabela.id, tip: proizvodTabela.tip})


    const res = NextResponse.json(p)
    return res;

}