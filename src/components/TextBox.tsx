import Image from "next/image";
import React from "react";
import { ostaliProizvodi } from "@/shared/types";

type Props = {
  name: String;
}

export default function TextBox( { name }: Props) {
return (
    <section className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:grid-cols-3 gap-6 justify-center">
        <div key={2} className="group relative overflow-hidden rounded-lg border bg-gray-300 p-6 shadow hover:bg-gray-400 hover:shadow-lg">
          
          <h3 className="text-xl font-semibold mb-2 text-gray-950">{name}</h3>
          <Image src="/heehee.jpg"
                 alt=""
                 width={400}
                 height={300}
                 className="h-40 w-full object-cover transition-transform duration-200 group-hover:scale-101"
               />

          <p className="text-gray-700">{}</p>
          <p></p>
        </div>
      </section>
);
}