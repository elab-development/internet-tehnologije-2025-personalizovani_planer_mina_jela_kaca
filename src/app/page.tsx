import Image from "next/image";
import PlanerBrowser from "@/components/PlanerBrowser";
export default async function Home() {
  
  
  return (
    <>
    <main className="min-h-screen bg-gray-100 font-sans">

      

      
      <section className="py-16 text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">PerPl - est. 2025</h2>
        <p className="text-gray-600 text-lg mb-6">
          Vaš najfleksibilniji planer... ruža emodži kafica emodži...
        </p>
        <button className="bg-violet-900 text-violet-200 px-6 py-3 rounded hover:bg-indigo-500 transition">
          Kreiraj novi planer
        </button>
      </section>

      
      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Planeri</h3>
          <p className="text-gray-600">Generički planeri: serija klasičnih planera na stanju.</p>
        </div>
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">PerPl Planer</h3>
          <p className="text-gray-600">Kreirajte planer po Vašoj meri.</p>
        </div>
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Ostali proizvodi</h3>
          <p className="text-gray-600">Ostali pribor za pisanje, i još neke drangulije.</p>
        </div>
      </section>

      
      <footer className="bg-white shadow py-4 mt-12 text-center text-gray-500 text-sm">
        &copy; 2026 PerPl :P
      </footer>

    </main>
    </>
  )
}

