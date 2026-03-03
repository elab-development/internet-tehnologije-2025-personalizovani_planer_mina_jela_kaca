import { AUTH_COOKIE } from "@/lib/auth";
import { cookies } from "next/headers";

import { KastomizacijaClientWrapper } from "@/components/KastomizacijaClientWrapper";



export default async function Kastomizacija(){
    
    const kolac = await cookies();
    const token = kolac.get(AUTH_COOKIE)?.value;
   
    return <KastomizacijaClientWrapper token={token ?? null}/>

}