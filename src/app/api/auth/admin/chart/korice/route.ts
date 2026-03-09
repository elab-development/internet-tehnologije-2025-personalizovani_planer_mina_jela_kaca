import { db } from "@/db";
import { koriceTabela, planerTabela, stavkaNarudzbeniceTabela } from "@/db/schema";
import { count, eq } from "drizzle-orm";
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

export async function GET() {

    const data = await db
        .select({izgled: koriceTabela.izgled, broj: count(koriceTabela.id)})
        .from(planerTabela)
        .innerJoin(koriceTabela, eq(planerTabela.koriceID, koriceTabela.id))
        .innerJoin(stavkaNarudzbeniceTabela,eq(planerTabela.proizvodID, stavkaNarudzbeniceTabela.proizvodID))
        .groupBy(koriceTabela.izgled);
    

    const chartData = [
        ["Korice", "Broj narudžbenica"],
        ...data.map((red) => [
            red.izgled === "-" ? "koža" : (red.izgled ?? "Nepoznato"), 
            Number(red.broj)])
    ];

    return Response.json(chartData);
}