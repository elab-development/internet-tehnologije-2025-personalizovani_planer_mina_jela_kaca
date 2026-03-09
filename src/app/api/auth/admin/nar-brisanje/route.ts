import { db } from "@/db";
import { korisniciTabela, narudzbenicaTabela } from "@/db/schema";
import { AUTH_COOKIE, verifyAuthToken } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
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

export async function DELETE(req:Request) {
    try{
    const token = (await cookies()).get(AUTH_COOKIE)?.value;
    if(!token) return NextResponse.json({error: "Nije autentifikovan"}, {status: 401});

    let adminID: string;
    adminID = verifyAuthToken(token).sub;

    const [admin] = await db
        .select({uloga: korisniciTabela.uloga})
        .from(korisniciTabela)
        .where(eq(korisniciTabela.id, adminID));

    if(!admin || admin.uloga !== "admin"){
        return NextResponse.json({error: "Zabranjen pristup korisniku"}, {status: 403});
    }

    const body = await req.json();
    const {narID} = body;
    if(!narID) return NextResponse.json({error: "Nema narudzbenicaID"}, {status: 400});

    await db.delete(narudzbenicaTabela).where(eq(narudzbenicaTabela.id,narID));

    return NextResponse.json({success: true});

}catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server greska LALALALALA" }, { status: 500 });
  }

}