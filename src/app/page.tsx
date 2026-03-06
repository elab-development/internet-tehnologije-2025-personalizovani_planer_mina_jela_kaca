"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"; //jer fetch treba raditi nakon što se komponenta mound-uje u browser-u 


type ZenData = {
  q: string //quote
  a: string //author
  c: string //character count
  h: string //pre-formatted html
}

export default function Home() {
  
  const [data, setData] = useState<ZenData[] | null>(null);
  const router = useRouter();

  useEffect(()=> {
    const fetchData = async () => {
      const response = await fetch("/api/external/zen");
      if(!response.ok){
        throw new Error("Neuspešno fetch-ovanje!");
      }
      const result = await response.json();
      setData(result);
    }
    fetchData();
  },[]);

  
  return (
    <>
    <main className="min-h-screen bg-purple-100 font-sans">      
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-pink-700">
          PerPl - personalizovani planer
        </h1>
        <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <p className="text-gray-600 text-lg text-center mb-6">
            Najfleksibilniji planer za sve Vaše potrebe.<br /> 
            Postanite jedan od stotine zadovoljnih kupaca PerPl planera :) <br />
        </p>       
        <Image src="/heehee.jpg" alt="naslovna strana - slika" width={400} height={300}
              className="h-40 w-full object-cover transition-transform duration-200 group-hover:scale-101"
          />
          
      </section>

  
      <section className="max-w-6xl mx-auto px-4 py-12 gap-6 flex flex-col">
      <p className="text-lg text-center">Personalizovani planer korisniku može prilagoditi dizajn i materijal korice, stanice i vrstu kalendara. <br />
      Da biste izvršili online kupovinu, potrebno je da postanete <a href="/sign-in" className="text-purple-800 hover:text-pink-600 italic">registrovani korisnik</a>.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
        <button
          onClick={() => router.push("/kastomizacija")} 
          className="bg-purple-700 text-white text-xl px-6 py-3 rounded hover:bg-pink-600 w-60 justify-self-end">
          Kreiraj novi planer
        </button>
        <button
          onClick={() => router.push("/prodavnica")} 
          className="bg-purple-700 text-white text-xl px-6 py-3 rounded hover:bg-pink-600 w-60 justify-self-start">
          Stikeri
        </button>
      </div>
        

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
          <h3 className="text-xl font-semibold mb-2">{data?.[0]?.a}</h3>
          <p className="text-gray-600">"{data?.[0]?.q}"</p>
        </div>
      </section>

      
  
    <p className="text-center text-gray-500">Inspirational quotes provided by <a href="https://zenquotes.io/" target="_blank">ZenQuotes API</a></p>
    </main>
    </>
  )
}

