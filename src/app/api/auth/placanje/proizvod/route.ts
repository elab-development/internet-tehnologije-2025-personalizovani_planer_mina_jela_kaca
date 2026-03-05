import { db } from "@/db";
import { proizvodTabela } from "@/db/schema";
import { NextResponse } from "next/server";

type Proizvod = {
    //id treba da se generise
    tip: "planer" | "stiker";
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