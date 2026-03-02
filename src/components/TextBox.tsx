import Image from "next/image";
import React from "react";
import { ostaliProizvodi } from "@/shared/types";


type Stiker = {
  proizvodID: string | null;
  opis: string | null;
  cena: number | null;
  createdAt: Date | null;
};

type Props = {
  stiker: Stiker;
};

export default function TextBox({stiker}:Props) {
return (
    <section className="max-w-6xl mx-auto px-4 py-12 md:grid-cols-3 gap-6">
        <div key={2} className="group relative overflow-hidden rounded-lg border-gray-300 bg-gray-200 p-6 shadow hover:bg-gray-300 hover:shadow-lg flex flex-col justify-center">
          
          <h3 className="text-xl font-semibold mb-2 text-purple-900 text-center">STIKER</h3>
          <Image src="/heehee.jpg"
                 alt=""
                 width={400}
                 height={300}
                 className="h-40 w-full object-cover transition-transform duration-200 group-hover:scale-101 rounded-2xl"
               />

          <p className="text-violet-800">OPIS: {stiker.opis}</p>
          <p className="text-pink-700 italic"><i className="text-gray-800">CENA: </i>{stiker.cena}</p>

          <button 
            className="bg-purple-600 text-white px-2 py-1 rounded hover:bg-pink-500">
            DODAJ U KORPU
          </button>

        </div>
      </section>
);
}