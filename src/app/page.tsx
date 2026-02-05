import Image from "next/image";
import PlanerBrowser from "@/components/PlanerBrowser";
import TextBox from "@/components/TextBox";

export default async function Home() {
  
  
  return (
    <>
    <main className="min-h-screen bg-purple-100 font-sans">

      

      
      <section className="py-16 text-center">
        <h2 className="text-4xl font-bold mt-6 mb-4 text-pink-800">PerPl</h2>
        <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-6"><p className="text-gray-600 text-lg mb-6">
          Najfleksibilniji planer za sve Vaše potrebe. Lorem ipsum dolor sit amet consectetur adipisicing elit. Et tempora recusandae beatae pariatur deserunt voluptas omnis minus at, molestiae dolor reprehenderit adipisci numquam? At excepturi facilis adipisci, ex accusamus maiores?
        </p>       
        <Image src="/heehee.jpg"
                         alt=""
                         width={400}
                         height={300}
                         className="h-40 w-full object-cover transition-transform duration-200 group-hover:scale-101"
                       />

      </section>

      <button className="bg-black text-violet-200 px-6 py-3 rounded hover:bg-pink-600 ">
          Kreiraj novi planer
        </button></section>

      
      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-6 flex-row">
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Prodavnica</h3>
          <p className="text-gray-600">Klasični planeri i ostali kancelarijski pribor trenutno na stanju.</p>
        </div>
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">PerPl Planer</h3>
          <p className="text-gray-600">Kreirajte planer po Vašoj meri.</p>
        </div>
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Organizacija bez stresa :)</h3>
          <p className="text-gray-600">Sve je u dobroj organizaciji</p>
        </div>
      </section>

      
      <footer className="bg-white shadow py-4 mt-12 text-center text-gray-500 text-sm">
        Kontakt telefon: +381 61 2345678 <br/>
        &copy; FON
      </footer>

    </main>
    </>
  )
}

