import PlanerBrowser from "@/components/PlanerBrowser";
import { ostaliProizvodi } from "@/shared/types";
import TextBox from "@/components/TextBox";
import { mockProizvodi } from "@/mock/data";

const BrojProizvoda = 6;



interface Props {
  searchParams?: { page?: string };
}

export default async function ProdavnicaPage({ searchParams }: Props) {
  const p = await searchParams;
  const currentPage = parseInt( p?.page || "1");
  const totalPages = Math.ceil(mockProizvodi.length / BrojProizvoda);

  const startIndex = (currentPage - 1) * BrojProizvoda;
  const currentItems = mockProizvodi.slice(startIndex, startIndex + BrojProizvoda);

  return (
    <main className=" bg-gray-100 font-sans min-h-screen">
        <div className="py-16 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Prodavnica</h1>
        <h1 className="text-gray-600">Trenutno dostupni artikli:</h1>
        </div>
    <section className="bg-slate-100 max-w-6xl mx-auto px-4 py-12 pb-15 grid md:grid-cols-3 gap-6 rounded-3xl">
      {currentItems.map((proizvod) => (
        <TextBox key={proizvod.id} name={proizvod.naziv} />
      ))}

      <div className="col-span-full flex justify-center items-center mt-8 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <a
            key={i}
            href={`?page=${i + 1}`}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-pink-500 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </a>
        ))}
      </div>
    </section>
    </main>
  );
}