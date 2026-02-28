import { AUTH_COOKIE } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { KastomizacijaClient } from "@/components/KastomizacijaClient";



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

        //onemoguci dugme dok nisu izabrane sve opcije! radiobutton-i i combobox-ovi

        //LOGIKA ZA DUGME DODAJ U KORPU
        redirect("/korpa");

    }

    //RADIO BUTTON
    


    return(
        <main className="min-h-screen bg-gray-100 font-sans bg-purple-100 flex flex-col items-center gap-2">
            <div className="py-20 text-center">
                <h1 className="text-4xl font-bold mb-1 text-purple-800">NAPRAVI SVOJ</h1>
                <h1 className="text-4xl font-bold mb-4 text-pink-700">PERSONALIZOVANI PLANER</h1>
            </div>

            {/*DIV ZA DIMENZIJE*/}
            <div className="flex flex-col items-center gap-4 border-4 border-dotted border-purple-500 rounded-lg py-8 px-20">
                <h2 className="text-lg font-bold text-purple-800">DIMENZIJE:</h2>
                <KastomizacijaClient type="dimenzija"/>
                
                <h2 className="text-lg font-bold text-purple-800">BROJ STRANICA:</h2>
                <KastomizacijaClient type="brStranica"/> 

                <h2 className="text-lg font-bold text-purple-800">VRSTA STRANICA(LINIJA):</h2>
                <KastomizacijaClient type="vrstaStranica"/> 

                <h2 className="font-semibold text-purple-800 pt-4">Posveta:</h2> 
                <input type="text" maxLength={30} className="border-1 border-purple-800 w-full" />

            </div>


            {/*DIV ZA KORICE*/}
            <div className="flex flex-col items-center gap-4 border-4 border-dotted border-purple-500 rounded-lg py-8 px-20">

                <h2 className="text-lg font-bold text-purple-800">KORICE:</h2>
                <KastomizacijaClient type="korice"/>

                {/*POD-DIV ZA KORICE*/}
                <div></div>

            </div>


            {/*DIV ZA BOJU STRANICA*/}
            <div></div>


            {/*DIV ZA KALENDAR*/}
            <div></div>

            {/*DUGME forma*/}
            <form action={dodajUKorpu} className="text-center pb-4">
                <button
                    type="submit"
                    className="bg-purple-600 hover:bg-pink-500 text-white rounded-lg px-3 py-3">
                    Dodaj u korpu!
                </button>    
            </form>           

        </main>

    )

}