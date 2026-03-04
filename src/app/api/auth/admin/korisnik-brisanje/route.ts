import { db } from "@/db";
import { korisniciTabela } from "@/db/schema";
import { AUTH_COOKIE, verifyAuthToken } from "@/lib/auth";
import { error } from "console";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


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
    const {userID} = body;
    if(!userID) return NextResponse.json({error: "Nema userID"}, {status: 400});

    await db.delete(korisniciTabela).where(eq(korisniciTabela.id,userID));

    return NextResponse.json({success: true});

    }catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server greska LALALALALA" }, { status: 500 });
  }

}