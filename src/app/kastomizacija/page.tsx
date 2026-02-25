import { AUTH_COOKIE } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";



export default async function Kastomizacija(){

    //PROVERA DA LI JE ULOGOVAN -- AKO NIJE NE MOZE DA DODA STVARI U KORPU!!!!

    //cena - koja se menja tj. izracuna se kada korisnik pritisne dugme dodaj u korpu,
    //prolazi kroz opcije i uzima potrebne info
    //ta cena se upisuje u bazu kod planera


    const kolac = await cookies();
    const token = kolac.get(AUTH_COOKIE)?.value;
   
    async function dodajUKorpu() {
        "use server";

        if(!token){
            redirect("/log-in");
        }

        //LOGIKA ZA DUGME DODAJ U KORPU
        redirect("/korpa");

    }


    return(
        <main className="min-h-screen bg-gray-100 font-sans bg-purple-100 
            absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e9cced_1px,transparent_1px)] [background-size:16px_16px] ">
            <div className="py-20 text-center">
                <h1 className="text-4xl font-bold mb-1 text-purple-800">NAPRAVI SVOJ</h1>
                <h1 className="text-4xl font-bold mb-4 text-pink-800">PERSONALIZOVANI PLANER</h1>
            </div>

            {/*DIV ZA DIMENZIJE*/}
            <div></div>


            {/*DIV ZA LINIJE/ POSVETU */}
            <div></div>


            {/*DIV ZA KORICE*/}
            <div>

                {/*POD-DIV ZA KORICE*/}
                <div></div>

            </div>


            {/*DIV ZA BOJU STRANICA*/}
            <div></div>


            {/*DIV ZA KALENDAR*/}
            <div></div>

            {/*DUGME forma*/}
            <form action={dodajUKorpu} className="text-center">
                <button
                    type="submit"
                    className="bg-purple-600 hover:bg-pink-500 text-white rounded-lg px-3 py-3">
                    Dodaj u korpu!
                </button>    
            </form>           

        </main>

    )

}