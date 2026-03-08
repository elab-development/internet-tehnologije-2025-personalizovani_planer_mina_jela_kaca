"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"; //jer fetch treba raditi nakon što se komponenta mound-uje u browser-u 
import Footer from "@/components/Footer";

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
    <main className="snap-y snap-mandatory overflow-y-auto h-screen w-full scrollbar-hide">      
      
      <section className="h-screen w-full snap-start flex items-center justify-center bg-[url(/planer3.jpg)] bg-cover bg-center">
        <div className="h-full w-full bg-violet-200/70 flex flex-col items-center justify-center text-center p-4">
           <h1 className="text-6xl font-bold mb-4 text-pink-700 font-anton">
            PerPl - personalizovani planer
           </h1>
           <p className="text-gray-600 text-lg max-w-xl">
            Najfleksibilniji planer za sve Vaše potrebe.<br /> 
            Postanite jedan od stotine zadovoljnih kupaca PerPl planera :)
           </p>   
        </div>
      </section>

      
      <section className="h-screen w-full flex flex-col items-center justify-center bg-purple-100 px-4">
        <div className="max-w-6xl w-full space-y-12 grid grid-cols-2">
          <div className="text-center grid grid-cols-1 mt-5">
            <p className="text-lg">
              Personalizovani planer korisniku može prilagoditi dizajn i materijal korice, stanice i vrstu kalendara. <br />
              Da biste izvršili online kupovinu, potrebno je da postanete <a href="/sign-in" className="text-purple-800 hover:text-pink-600 italic ml-1">registrovani korisnik</a>.
            </p>
            
            
            <div className="flex flex-row gap-4 justify-center mt-8 w-full">
              <button onClick={() => router.push("/kastomizacija")} className="bg-purple-700 text-white text-xl px-6 py-3 rounded hover:bg-pink-600 w-52 shadow-md transition-all"> Kreiraj planer
              </button>
              <button onClick={() => router.push("/prodavnica")} className="bg-purple-700 text-white text-xl px-6 py-3 rounded hover:bg-pink-600 w-52 shadow-md transition-all"> Stikeri
              </button>
            </div>

          </div>

          
          <div className="grid grid-cols-3 md:grid-cols-1 gap-6 w-full">
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">Prodavnica</h3>
              <p className="text-gray-600">Klasični planeri i stikeri trenutno na stanju.</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">PerPl Planer</h3>
              <p className="text-gray-600">Kreirajte planer po Vašoj meri.</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">{data?.[0]?.a || "Učitavanje..."}</h3>
              <p className="text-gray-600 italic">"{data?.[0]?.q}"</p>
            </div>
          </div>
        </div>

        
        <p className="mt-12 text-sm text-gray-500">
          Inspirational quotes provided by <a href="https://zenquotes.io/" target="_blank" className="underline">ZenQuotes API</a>
        </p>
        
      </section>
      <div className="snap-start">
        
      </div>
    </main>
  );
}