

import Image from "next/image";
import PlanerBrowser from "@/components/PlanerBrowser";
import TextBox from "@/components/TextBox";

import ComboBox from "@/components/ComboBox";



export default function Home() {
  
  
  return (
    <>
    <main className="min-h-screen bg-purple-100 font-sans">

      

      
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-pink-700">PerPl - personalizovani planer</h1>
        <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-6"><p className="text-gray-600 text-lg text-justify mb-6">
          Najfleksibilniji planer za sve Vaše potrebe.
          <br /> 
          Postanite jedan od stotine zadovoljnih kupaca PerPl planera :) <br />
          
        </p>       
        <Image src="/heehee.jpg" alt="naslovna strana - slika" width={400} height={300}
              className="h-40 w-full object-cover transition-transform duration-200 group-hover:scale-101"
          />
          
                           
                       

      </section>

      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-6">
      <p className="text-justify text-lg">Personalizovani planer korisniku može prilagoditi dizajn i materijal korice, stanice i vrstu kalendara. <br />
      Da biste izvršili online kupovinu, potrebno je da postanete registrovani korisnik.</p>

       <a href="/kastomizacija">
          <button className="bg-black text-violet-200 px-6 py-3 rounded hover:bg-pink-600 ">
            Kreiraj novi planer
          </button>
        </a> 
      </section>
        
      </section>

      
      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-6 flex-row">
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Prodavnica</h3>
          <p className="text-gray-600">Klasični planeri i stikeri trenutno na stanju.</p>
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

      
  

    </main>
    </>
  )
}

