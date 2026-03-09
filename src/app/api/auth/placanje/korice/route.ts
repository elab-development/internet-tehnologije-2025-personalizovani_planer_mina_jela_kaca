import { db } from "@/db";
import { koriceTabela } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";


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

export async function GET(req: Request){

    const {searchParams} = new URL(req.url);
    const tip = (searchParams.get("tip")) as "patern" | "boja" | "koža";
    let izgled = searchParams.get("izgled");

    if(tip === "koža"){
      izgled = "-";
    }

    if(!tip || !izgled){
        return NextResponse.json({error: "Nema podataka!"}, {status: 400})
    }

    
    const [k] = await db
        .select({id: koriceTabela.id})
        .from(koriceTabela)
        .where(and(
          eq(koriceTabela.tip, tip), 
          eq(koriceTabela.izgled, izgled))
        );


    const res = NextResponse.json(k)
    return res;

}