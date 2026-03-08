"use client"
import { useKorpa } from "@/app/context/KorpaContext";
import Image from "next/image";

type Stiker = {
  proizvodID: string | null;
  opis: string | null;
  cena: number | null;
  createdAt: Date | null;
};

type Props = {
  stiker: Stiker;
  token: string | undefined;
};

export default function TextBox({stiker, token}:Props) {

  const {addProizvod} = useKorpa();

  const handleDodavanjeStikera = () => {

    //provera da li je ulogovan
    if(!token){
      alert("Morate da se ulogujete!");
      return;
    }

    const stikerZaKorpu = {
      tip: "stiker" as const,
      data: {
        opis: stiker.opis || "bez opisa",
        cena: stiker.cena ?? 0,
        kolicina: 1,
        cenaKol: stiker.cena ?? 0, // cena * kolicina
      },
    };

    addProizvod(stikerZaKorpu);
    alert("Stiker je dodat u korpu!")
  }

return (
    <section className="max-w-6xl mx-auto px-4 py-12 md:grid-cols-3 gap-6 z-30">
        <div key={2} className="group relative overflow-hidden rounded-lg border-gray-300 bg-gray-200 p-6 shadow hover:bg-gray-300 hover:shadow-lg flex flex-col justify-center w-64 h-100">
          
          <h3 className="text-xl font-semibold mb-2 text-purple-900 text-center">STIKER</h3>
          <Image src={`/images/${stiker.opis}.png`}
                 alt=""
                 width={400}
                 height={400}
                 className="h-55 w-full object-cover transition-transform duration-200 group-hover:scale-101 rounded-2xl"
               />

          <p className="text-violet-800">OPIS: {stiker.opis}</p>
          <p className="text-pink-700 italic"><i className="text-gray-800">CENA: </i>{stiker.cena}</p>

          <button 
            onClick={handleDodavanjeStikera}
            className="bg-purple-600 text-white px-2 py-1 rounded hover:bg-pink-500">
            DODAJ U KORPU
          </button>

        </div>
      </section>
);
}