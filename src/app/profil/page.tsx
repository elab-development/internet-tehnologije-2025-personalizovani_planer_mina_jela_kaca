import { db } from "@/db";
import { korisniciTabela } from "@/db/schema";
import { AUTH_COOKIE, verifyAuthToken } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import KorisnikInfo from "@/components/KorisnikInfo";

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

    return(
        <main className="min-h-screen bg-purple-100 font-sans">
            <div className="py-16 text-center">
                <h1 className="text-4xl font-bold mb-4 text-gray-800 text-pink-600">KORISNIČKI PROFIL</h1>
            
                <KorisnikInfo k={k}></KorisnikInfo>
            </div>
        </main>

    )

}