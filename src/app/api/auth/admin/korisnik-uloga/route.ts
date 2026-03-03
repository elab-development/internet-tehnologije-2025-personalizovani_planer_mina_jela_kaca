import { db } from "@/db";
import { korisniciTabela } from "@/db/schema";
import { AUTH_COOKIE, verifyAuthToken } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function PUT(req:Request) {
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

    //provera uloge za userID -- ako je admin postaje ulogovani -- i obrnuto
    const [trenutnaUloga] = await db
        .select({uloga: korisniciTabela.uloga})
        .from(korisniciTabela)
        .where(eq(korisniciTabela.id, userID));

    if(!trenutnaUloga){
        return NextResponse.json({ error: "Korisnik ne postoji" }, { status: 404 });
    }

    let novaUloga: "admin" | "ulogovani" = trenutnaUloga.uloga === "admin" ? "ulogovani" : "admin";
    

    await db.
        update(korisniciTabela)
        .set({uloga: novaUloga})
        .where(eq(korisniciTabela.id, userID));

    return NextResponse.json({success: true});
    

}