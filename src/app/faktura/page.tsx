import { AUTH_COOKIE } from "@/lib/auth";
import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";

export default async function Placanje(){

    const kolac = await cookies();
    const token = kolac.get(AUTH_COOKIE)?.value;
       

    return(
        <div>
            <h1 className="text-lg font-bold text-purple-800">FAKTURA</h1>
        </div>
    );
}