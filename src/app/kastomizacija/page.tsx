import { AUTH_COOKIE } from "@/lib/auth";
import { cookies } from "next/headers";

import { KastomizacijaClientWrapper } from "@/components/KastomizacijaClientWrapper";



export default async function Kastomizacija(){

    //PROVERA DA LI JE ULOGOVAN -- AKO NIJE NE MOZE DA DODA STVARI U KORPU!!!!

    //CENAAA - koja se menja tj. izracuna se kada korisnik pritisne dugme dodaj u korpu,
    //prolazi kroz opcije i uzima potrebne info
    //ta cena se upisuje u bazu kod planera


    const kolac = await cookies();
    const token = kolac.get(AUTH_COOKIE)?.value;
   
    return <KastomizacijaClientWrapper token={token ?? null}/>

}