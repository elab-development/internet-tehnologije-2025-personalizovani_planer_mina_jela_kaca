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


    const korisnici = await db
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
        .orderBy(korisniciTabela.createdAt);

    


    return(
        <main className="min-h-screen bg-gray-100 font-sans">
            <div className="py-26 text-center">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">ADMIN STRANA</h1>
            </div>
            
            <div className="overflow-x-auto">
            <table className="mx-auto">
                <thead className="bg-purple-300">
                <tr>
                    <th className="px-6 py-4 text-center">Ime</th>
                    <th className="px-6 py-4 text-center">Prezime</th>
                    <th className="px-6 py-4 text-center">Username</th>
                    <th className="px-6 py-4 text-center">Email</th>
                    <th className="px-6 py-4 text-center">Adresa</th>
                    <th className="px-6 py-4 text-center">Uloga</th>
                    <th className="px-6 py-4 text-center">Kreiran</th>
                </tr>
                </thead>

                <tbody className="bg-purple-200">
                {korisnici.map((k) => (
                    <tr key={k.id}>
                        <td className="px-6 py-2 text-center">{k.ime}</td>
                        <td className="px-6 py-2 text-center">{k.prezime}</td>
                        <td className="px-6 py-2 text-center">{k.username}</td>
                        <td className="px-6 py-2 text-center">{k.email}</td>
                        <td className="px-6 py-2 text-center">{k.adresa}</td>
                        <td className="px-6 py-2 text-center">{k.uloga}</td>
                        <td className="px-6 py-2 text-center">{k.createdAt?.toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>    
            </table>    
            </div>

        </main>

    )

}
