import { db } from "@/db";
import { korisniciTabela } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { AUTH_COOKIE, cookieOpts, signAuthToken } from "@/lib/auth";

type Body = {
    email: string;
    password: string;
    username: string;
    ime: string;
    prezime: string;
    adresa: string;
}

export async function POST(req: Request){
    
    //uzeli smo iz requesta siftu i email i formatirali prema body tj tipu Body
    //req.json ce vratiti samo obican txt fajl 
    const {email, password, username, ime, prezime, adresa} = (await req.json()) as Body

    //proveravamo da li postoji sifra i email za korisnika
    if(!email || !password || !ime || !username || !prezime || !adresa){
        return NextResponse.json({error: "Nema podataka!"}, {status: 400})
    }

    //proveravamo za korisnika u bazi
    //ali uzimamo jednog korisnika jer ce ovo vratiti listu svih korisnika
    //PONOVO POGLEDATI ZASTO PETAR MISLI OVAKO
    const exists = await db.select().from(korisniciTabela).where(eq(korisniciTabela.email, email))
    if(exists.length){
        return NextResponse.json({error: "Email postoji u bazu!"}, {status: 400})
    }

    //poredimo sifre za korisnika
    const passHash = await bcrypt.hash(password, 10)

    //upisujemo u bazu novog korisnika
    const [k] = await db.insert(korisniciTabela)
    .values({username, email, ime, prezime, adresa, passHash})
    .returning({id: korisniciTabela.id, username: korisniciTabela.username, email: korisniciTabela.email,  ime: korisniciTabela.ime, 
        prezime: korisniciTabela.prezime, adresa: korisniciTabela.adresa
    })

    //kreiramo token
    const token = signAuthToken({sub: k.id, username: k.username, email: k.email, ime: k.ime, prezime: k.prezime, adresa: k.adresa })

    //upisujemo podatke u cookie
    //uzmemo response
    const res = NextResponse.json(k)

    //setujemo cookie
    res.cookies.set(AUTH_COOKIE, token, cookieOpts())

    //return korisnik tj response
    return res;
}