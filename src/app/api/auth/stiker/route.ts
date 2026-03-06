import { db } from "@/db";
import { stikerTabela } from "@/db/schema";
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
    const stikeri = await db.select().from(stikerTabela).orderBy(stikerTabela.createdAt);
    return NextResponse.json({stikeri});
}