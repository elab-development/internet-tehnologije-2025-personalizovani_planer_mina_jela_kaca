import PlanerBrowser from "@/components/PlanerBrowser";
import { ostaliProizvodi } from "@/shared/types";
import TextBox from "@/components/TextBox";
import { mockProizvodi } from "@/mock/data";
import { db } from "@/db";
import { stikerTabela } from "@/db/schema";
import Link from "next/link";
import { cookies } from "next/headers";
import { AUTH_COOKIE } from "@/lib/auth";

const BrojProizvoda = 3; //za paginaciju, koliko moze u jednom trenutku

interface Props {
  searchParams?: { page?: string };
}


export default async function ProdavnicaPage({ searchParams }: Props) {

  //ucitamo stikere iz baze
  try{
    const dataStiker = await db.select().from(stikerTabela).orderBy(stikerTabela.createdAt);
  
    const p = await searchParams;
    const currentPage = parseInt( p?.page || "1");
    const totalPages = Math.ceil(Object.keys(dataStiker).length / BrojProizvoda);

    const startIndex = (currentPage - 1) * BrojProizvoda;
    const currentItems = dataStiker.slice(startIndex, startIndex + BrojProizvoda); /////////
  
    //uzimamo auth token
    const kolac = await cookies();
    const token = kolac.get(AUTH_COOKIE)?.value;

    return (
      <main className=" bg-gray-100 font-sans min-h-screen">
        <div className="py-2 text-center">
          <h1>Prodavnica</h1>
          <h2>Trenutno dostupni artikli:</h2>
        </div>
        <section className="bg-slate-100 max-w-6xl mx-auto px-4 py-12 pb-15 grid md:grid-cols-3 gap-6 rounded-3xl">
          {currentItems.map((stiker) => (
          <TextBox key={stiker.proizvodID} stiker={stiker} token={token} /> ////prosledjujemo sve stikere
        ))}

        <div className="col-span-full flex justify-center items-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
          <Link
            key={i}
              href={`?page=${i + 1}`}
              className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-pink-500 text-white" : "bg-gray-200"
              }`}
            >
            {i + 1}
          </Link>
          ))}
        </div>
        </section>
      </main>
    );


  }catch(error){
    console.error("GRESKA", error);
      if (error instanceof Error) {
      console.error(error.stack);
  } 
  }
}

