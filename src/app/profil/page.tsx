import { AUTH_COOKIE } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Profil(){

    const kolac = await cookies();
    const token = kolac.get(AUTH_COOKIE)?.value;
    if(!token){
        redirect("/log-in");
    }

    return(
        <main className="min-h-screen bg-purple-100 font-sans">
            <div className="py-16 text-center">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">KORISNIČKI PROFIL</h1>
            </div>
        </main>

    )

}