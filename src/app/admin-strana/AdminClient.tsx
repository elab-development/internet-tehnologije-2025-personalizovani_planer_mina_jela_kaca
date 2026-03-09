"use client";

import { AdminNarTabela } from "@/components/AdminNarTabela";
import ComboBox from "@/components/ComboBox";
import { useState } from "react";

type Korisnik = {
  id: string;
  username: string;
  email: string;
};

type Props = {
  korisnici: Korisnik[];
  narudzbenice: any[];
};

export default function AdminClient({ korisnici, narudzbenice }: Props) {

    const [selectedID, setSelectedID] = useState<string>("sve");

    return(
        <div className="flex flex-col items-center py-4">
        
          <div className="py-4">
            <ComboBox korisnici={korisnici} onChange={setSelectedID} />
          </div>
            
          <AdminNarTabela nar={narudzbenice} kID={selectedID} korisnici={korisnici}/>


        </div>
    ); 

}