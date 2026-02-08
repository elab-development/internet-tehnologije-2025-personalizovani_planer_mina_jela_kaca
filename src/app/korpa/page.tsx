
import { cookies } from "next/headers";
import { AUTH_COOKIE, verifyAuthToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Korpa(){

    const kolac = await cookies();
    const token = kolac.get(AUTH_COOKIE)?.value;
    if(!token){
        redirect("/log-in");
    }

    return(
        <main className="min-h-screen bg-gray-100 font-sans">
            <div className="py-20 text-center">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">Korpa</h1>
                      <section className="bg-violet-200 max-w-6xl mx-auto px-4 py-12 grid gap-6 rounded-3xl">
                        <p className = "text-gray-900"> ovde idu vasi proizvodi :)
                        </p>
                      </section>
            </div>
        </main>

    )

}