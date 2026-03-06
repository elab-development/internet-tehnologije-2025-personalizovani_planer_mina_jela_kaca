"use client"

import Image from "next/image";
import PlanerBrowser from "@/components/PlanerBrowser";
import TextBox from "@/components/TextBox";

import ComboBox from "@/components/ComboBox";
import { useEffect, useState } from "react"; //jer fetch treba raditi nakon što se komponenta mound-uje u browser-u 

//dodat tip, data,setData, useEffect i useState , zasluge i izmenjena jedna kartica :)

type ZenData = {
  q: string //quote
  a: string //author
  c: string //character count
  h: string //pre-formatted html
}

export default function Home() {
  
  const [data, setData] = useState<ZenData[] | null>(null);

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

      <section className="py-16 text-center">
        <h2 className="text-4xl font-bold mt-6 mb-4 text-pink-800">PerPl</h2>
        <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-6"><p className="text-gray-600 text-lg mb-6">
          Najfleksibilniji planer za sve Vaše potrebe. Postanite jedan od stotine zadovoljnih kupaca :)
        </p>       
        <Image src="/heehee.jpg" alt="" width={400} height={300}
              className="h-40 w-full object-cover transition-transform duration-200 group-hover:scale-101"
          />
          <ComboBox />
                           
                       

      </section>

       <a href="/kastomizacija">
          <button className="bg-black text-violet-200 px-6 py-3 rounded hover:bg-pink-600 ">
            Kreiraj novi planer
          </button>
        </a> 
        
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

