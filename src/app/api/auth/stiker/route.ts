import { db } from "@/db";
import { stikerTabela } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
    const stikeri = await db.select().from(stikerTabela).orderBy(stikerTabela.createdAt);
    return NextResponse.json({stikeri});
}