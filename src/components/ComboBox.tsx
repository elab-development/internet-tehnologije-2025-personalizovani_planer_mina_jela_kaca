"use client";


import { dizajnKoricaenum } from "@/shared/types"
import { useState } from "react"

type props = {
    name: string;
}



export default function ComboBox(){
const opcije = dizajnKoricaenum;

  const [selected, setSelected] = useState<dizajnKoricaenum>(
    dizajnKoricaenum.roze
  );

  const options = Object.values(dizajnKoricaenum).filter(
    (v) => typeof v === "string"
  ) as string[];

return ( 
    
    <section>
            <select
      value={dizajnKoricaenum[selected]}
      onChange={(e) =>
        setSelected(dizajnKoricaenum[e.target.value as keyof typeof dizajnKoricaenum])
      }
    >
      {options.map((label) => (
        <option key={label} value={label}>
          {label}
        </option>
      ))}
    </select>
         </section>
  
    )
}
