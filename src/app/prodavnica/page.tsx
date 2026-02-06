import PlanerBrowser from "@/components/PlanerBrowser";
import { ostaliProizvodi } from "@/shared/types";
import TextBox from "@/components/TextBox";
import { mockProizvodi } from "@/mock/data";

const BrojProizvoda = 6;



interface Props {
  searchParams?: { page?: string };
}

export default function ProdavnicaPage({ searchParams }: Props) {
  const currentPage = parseInt(searchParams?.page || "1");
  const totalPages = Math.ceil(mockProizvodi.length / BrojProizvoda);

  const startIndex = (currentPage - 1) * BrojProizvoda;
  const currentItems = mockProizvodi.slice(startIndex, startIndex + BrojProizvoda);

  return (
    <main className="min-h-screen bg-gray-100 font-sans">
        <div className="py-16 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Prodavnica</h1>
        <h1 className="text-gray-600">Trenutno dostupni artikli:</h1>
        </div>
    <section className="bg-violet-200 max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6 rounded-3xl">
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
    <footer className="bg-white shadow py-4 mt-12 text-center text-gray-500 text-sm">
        Kontakt telefon: +381 61 2345678 <br/>
        &copy; FON
      </footer>
    </main>
  );
}
