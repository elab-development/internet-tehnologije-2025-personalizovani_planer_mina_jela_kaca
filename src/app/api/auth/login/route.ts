import { db } from "@/db";
import { korisniciTabela } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { AUTH_COOKIE, cookieOpts, signAuthToken } from "@/lib/auth";

type Body = {
    username: string;
    password: string;
}

export async function POST(req: Request){
    
    //uzeli smo iz requesta sifru i email i formatirali prema body tj tipu Body
    //req.json ce vratiti samo obican txt fajl 
    const {username, password} = (await req.json()) as Body

    //proveravamo da li postoji sifra i email za korisnika
    if(!username || !password){
        return NextResponse.json({error: "Pogresno korisnicko ime ili lozinka!"}, {status: 401})
    }

    //proveravamo za korisnika u bazi
    //ali uzimamo jednog korisnika jer ce ovo vratiti listu svih korisnika
    //PONOVO POGLEDATI ZASTO PETAR MISLI OVAKO
    const [k] = await db.select().from(korisniciTabela).where(eq(korisniciTabela.username, username))
    if(!k){
        return NextResponse.json({error: "Pogresno korisnicko ime"}, {status: 401})
    }

    //poredimo sifre za korisnika
    const ok = await bcrypt.compare(password, k.passHash)
    if(!ok){
        return NextResponse.json({error: "Pogresna lozinka!"}, {status: 401})
    }

    //kreiramo token
    const token = signAuthToken({sub: k.id, username: k.username, email: k.email, ime: k.ime, prezime: k.prezime, adresa: k.adresa, uloga: k.uloga })

    //upisujemo podatke u cookie
    //uzmemo response
    const res = NextResponse.json({id: k.id, email: k.email, ime: k.ime, prezime: k.prezime, adresa: k.adresa, uloga: k.uloga}, {status: 200})

    //setujemo cookie
    res.cookies.set(AUTH_COOKIE, token, cookieOpts())

    //return korisnik tj response
    return res;
}