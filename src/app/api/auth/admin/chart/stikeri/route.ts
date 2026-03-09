import { db } from "@/db";
import { stavkaNarudzbeniceTabela, stikerTabela } from "@/db/schema";
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
        .select({opis: stikerTabela.opis,broj: count(stikerTabela.proizvodID),})
        .from(stikerTabela)
        .innerJoin(stavkaNarudzbeniceTabela,eq(stikerTabela.proizvodID, stavkaNarudzbeniceTabela.proizvodID))
        .groupBy(stikerTabela.opis);

    const chartData = [
        ["Stiker", "Broj narudžbina"],
        ...data.map((red) => [red.opis ?? "Nepoznato", Number(red.broj)])];

    return NextResponse.json(chartData);
}

