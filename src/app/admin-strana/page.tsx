import { AdminKorisniciTabela } from "@/components/AdminKorisniciTabela";
import { db } from "@/db";
import { korisniciTabela } from "@/db/schema";
import { AUTH_COOKIE, verifyAuthToken } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function AdminStrana(){

    /*
    PROVERA DA LI JE OSOBA ADMIN!!! 
    */

    //provera da li je ulogovan:
    const kolac = await cookies();
    const token = kolac.get(AUTH_COOKIE)?.value;
    if(!token){
        redirect("/");
    }

    let kID: string;

    const claims = verifyAuthToken(token);
    kID = claims.sub;

    const [k] = await db
        .select({ uloga: korisniciTabela.uloga, ime: korisniciTabela.ime, prezime: korisniciTabela.prezime })
        .from(korisniciTabela)
        .where(eq(korisniciTabela.id, kID));

    if(!k || k.uloga !== "admin"){
        redirect("/");
    }


    console.log(k.ime + " " + k.prezime + " ");


    const korisnici = (await db
        .select({
            id: korisniciTabela.id,
            username: korisniciTabela.username,
            email: korisniciTabela.email,
            ime: korisniciTabela.ime,
            prezime: korisniciTabela.prezime,
            adresa: korisniciTabela.adresa,
            uloga: korisniciTabela.uloga,
            createdAt: korisniciTabela.createdAt,
        })
        .from(korisniciTabela)
        .orderBy(korisniciTabela.createdAt)
    ).map(k => ({
        ...k,
        createdAt: k.createdAt ? k.createdAt.toISOString() : "", //konvertujemo u string jer je tipa date
    }));

    
    return(
        <main className="min-h-screen bg-gray-100 font-sans">
            <div className="py-26 text-center">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">ADMIN STRANA</h1>
            </div>
            
            <AdminKorisniciTabela pocetniKorisnici={korisnici}/>


        </main>

    );

}
