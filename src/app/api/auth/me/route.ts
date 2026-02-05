//TODO

import { db } from "@/db";
import { korisniciTabela } from "@/db/schema";
import { AUTH_COOKIE, verifyAuthToken } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET() {
    const token = (await cookies()).get(AUTH_COOKIE)?.value
    if(!token){
        return NextResponse.json({user:null})
    }

    try {
        const claims = verifyAuthToken(token);
        const [u] = await db
            .select({id: korisniciTabela.id, username: korisniciTabela.username, email: korisniciTabela.email, ime: korisniciTabela.ime, 
                prezime: korisniciTabela.prezime, adresa: korisniciTabela.adresa, uloga: korisniciTabela.uloga})
            .from(korisniciTabela)
            .where(eq(korisniciTabela.id, claims.sub))

        return NextResponse.json({user: u ?? null})

    } catch {
        return NextResponse.json({user:null}, {status: 401})        
    }
}