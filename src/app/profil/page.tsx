import { db } from "@/db";
import { korisniciTabela } from "@/db/schema";
import { AUTH_COOKIE, verifyAuthToken } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProfilClient from "@/app/profil/ProfilClient"

export default async function Profil(){

    const kolac = await cookies();
    const token = kolac.get(AUTH_COOKIE)?.value;
    if(!token){
        redirect("/log-in");
    }
    
    let kID: string;
    const claims = verifyAuthToken(token);
    kID = claims.sub;
    
    //ucitamo celog korisnika iz baze
    const [k] = await db
        .select({id: korisniciTabela.id, username: korisniciTabela.username, email: korisniciTabela.email,
                ime: korisniciTabela.ime, prezime: korisniciTabela.prezime, adresa: korisniciTabela.adresa})
        .from(korisniciTabela)
        .where(eq(korisniciTabela.id, kID));

    return <ProfilClient k={k} userID={kID}/>

}