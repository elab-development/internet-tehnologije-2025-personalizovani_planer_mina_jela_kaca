import { db } from "@/db";
import { korisniciTabela } from "@/db/schema";
import { AUTH_COOKIE, verifyAuthToken } from "@/lib/auth";
import { error } from "console";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}

export async function DELETE(req:Request) {
    try{
    const token = (await cookies()).get(AUTH_COOKIE)?.value;
    if(!token) return NextResponse.json({error: "Nije autentifikovan"}, {status: 401});

    let loggedUserID: string;
    loggedUserID = verifyAuthToken(token).sub;

    const body = await req.json();
    const {userID} = body;
    
    if(!userID) return NextResponse.json({error: "Nema userID"}, {status: 400});

    if (loggedUserID !== userID) {
      return NextResponse.json({ error: "Nemate dozvolu da obrišete ovog korisnika!" }, { status: 403 });
    }

    await db.delete(korisniciTabela).where(eq(korisniciTabela.id,userID));

    return NextResponse.json({success: true});

    }catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server greska LALALALALA" }, { status: 500 });
  }

}