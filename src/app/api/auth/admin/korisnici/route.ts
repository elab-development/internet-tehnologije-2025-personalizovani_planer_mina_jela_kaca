import { db } from "@/db";
import { korisniciTabela } from "@/db/schema";
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
  const korisnici = await db.select().from(korisniciTabela).orderBy(korisniciTabela.ime);
  return NextResponse.json({ users: korisnici });
}
