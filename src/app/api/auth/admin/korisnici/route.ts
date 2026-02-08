import { db } from "@/db";
import { korisniciTabela } from "@/db/schema";
import { NextResponse } from "next/server";


export async function GET() {
  const korisnici = await db.select().from(korisniciTabela).orderBy(korisniciTabela.createdAt);
  return NextResponse.json({ users: korisnici });
}
