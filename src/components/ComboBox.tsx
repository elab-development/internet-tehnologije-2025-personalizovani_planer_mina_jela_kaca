"use client";

import { useState } from "react"

type Korisnik = {
  id: string;
  username: string;
   email: string;
}

type Props = {
  korisnici: Korisnik[];
  onChange: (selectedId: string) => void;
}
export default function ComboBox({korisnici, onChange}:Props){

  const [selected, setSelected] = useState<string>("sve");

  const options = [
    {label: "sve narudzbenice", value: "sve"},
    ...korisnici.map((k) => ({
      label: `${k.email} [${k.username}]`, value: k.id
    })),
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value);
    onChange(value); //vraca id/"sve"!
  };

  return (    
    <section>
      <select
        value={selected}
        onChange={(handleChange)}
        className="border-2 border-violet-200 bg-violet-100 mb-1 px-2 rounded-3xl font-light"
      >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="text-light text-slate-500">
          {opt.label}
        </option>
      ))}
      </select>
   </section>
  )
}
