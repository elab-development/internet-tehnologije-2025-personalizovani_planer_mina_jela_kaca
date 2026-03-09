import { db } from "@/db"
import { stikerTabela } from "@/db/schema";
import { eq } from "drizzle-orm";
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

export async function GET(req: Request) {
    
    const { searchParams } = new URL(req.url);
    const opis = searchParams.get("opis");

    if(!opis){
        return NextResponse.json({error: "Nema podataka!"}, {status: 400});
    }

    const [s] = await db
        .select({id: stikerTabela.proizvodID, opis: stikerTabela.opis, cena: stikerTabela.cena})
        .from(stikerTabela)
        .where(eq(stikerTabela.opis, opis))

    const res = NextResponse.json(s)
    return res;
    
}