"use client"

import { KorpaProizvod, useKorpa } from "@/app/context/KorpaContext";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import KorisnikInfo from "../../components/KorisnikInfo";

type Korisnik = {
    id: string;
    username: string;
    email: string;
    ime: string;
    prezime: string;
    adresa: string;
}

type KorisnikProps = {
    k: Korisnik;
}

export default function PlacanjeClient({k}:KorisnikProps){
    
    const {korpa, removeAllProizvod} = useKorpa();
    const [ptt, setPtt] = useState("");
    const [novaAdresa, setNovaAdresa] = useState("");

    const router = useRouter();
    const [placanjeZavrseno, setPlacanjeZavrseno] = useState(false);

    //da se ne bi menjalo stanje tokom renderovanja komponente --> koristimo useEffect
    useEffect(() => {       
        if (korpa.length === 0 && !placanjeZavrseno) {
            router.replace("/korpa");
        }
    }, [korpa, placanjeZavrseno, router]);
    //ako pokusa da renderuje dok traje router.replace(redirect)
    if (korpa.length === 0) {
        return null;
    }

    const ukupno = korpa.reduce((sum, item) => sum + item.data.cena, 0);
    const ukupnoString = ukupno.toFixed(2);

    //--------------------------------------------------DUGME-------------------------------------------
    const handlePoruci = async () => {
        if (ptt.length !== 5) {
            alert("PTT broj mora imati tačno 5 cifara!");
            return;
        }
        if(ptt === ""){
            alert("PTT polje je obavezno!");
            return;
        }
        
        const adresaZaDostavu = novaAdresa || k.adresa;

        //narudžbenica
        const narudzbenicaRes = await fetch("/api/auth/placanje/narudzbenica", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                adresa: adresaZaDostavu,
                pttBroj: Number(ptt),
                ukupnaCena: ukupno,
                korisnikID: k.id
            })
        });
        const narudzbenica = await narudzbenicaRes.json();
        
        for(const item of korpa){
            let proizvodID: string = "";

            if(item.tip === "planer"){  //------------PLANER------------
                //proizvod
                const proizvodRes = await fetch("/api/auth/placanje/proizvod", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ tip: "planer"})
                });
                const proizvod = await proizvodRes.json();
                //korice
                //params jer nema body kod GET api zahteva!! A treba nam request za where uslov :)
                const paramsK = new URLSearchParams({ //interfejs
                    tip: item.data.korice as "boja" | "patern" | "koža",
                    izgled: item.data.koriceIzgled ?? "-"
                });
                const koriceRes = await fetch(`/api/auth/placanje/korice?${paramsK.toString()}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const korice = await koriceRes.json();

                //planer
                const planerRes = await fetch("/api/auth/placanje/planer", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        posveta: item.data.posveta,
                        brojStranica: item.data.brojStranica,
                        dimenzije: item.data.dimenzije,
                        bojaStranica: item.data.bojaStranica,
                        vrstaKalendara: item.data.vrstaKalendara,
                        kalendar: item.data.kalendar,
                        vrstaStranica: item.data.vrstaStranica,
                        cena: item.data.cena,
                        proizvodID: proizvod.id,
                        koriceID: korice.id
                    })
                });
                const planer = await planerRes.json();
                proizvodID = planer.id;
            }
            else if(item.tip === "stiker"){  //------------STIKER------------
                
                //params jer nema body kod GET api zahteva!! A treba nam request za where uslov :)
                const params = new URLSearchParams({ //interfejs
                    opis: item.data.opis,
                });

                const stikerRes = await fetch(`/api/auth/placanje/stiker?${params.toString()}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const stiker = await stikerRes.json();
                proizvodID = stiker.id;
            }
            //NAPRAVI STAVKU NARUDŽBENICE za proizvod
            const stavkaRes = await fetch("/api/auth/placanje/stavka-narudzbenice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cena: item.data.cena,
                    narudzbenicaID: narudzbenica.id,
                    proizvodID: proizvodID
                })
            });
            const stavka = await stavkaRes.json();
        }
        
        alert("Uspešno poručivanje proizvoda!");
        
        setPlacanjeZavrseno(true);
        router.push(`/faktura?id=${narudzbenica.id}`); //šaljemo id narudžbenice, za razliku od redirect ne blokira nastavljanje
        removeAllProizvod(); //iz korpe
    } 


    return(
        <div>
        <section className="bg-violet-200 mx-auto px-4 py-12 grid gap-6 rounded-3xl w-200">
            <div className="w-192">
                {korpa.map((item: KorpaProizvod, index: number) => (
                    <div key={index} className="bg-purple-100 rounded-lg shadow p-6 mb-3 flex flex-col justify-between">
                        <div>
                            {item.tip === "planer" && (
                            <>
                                <h2 className="font-bold text-purple-800 text-xl text-left">Planer</h2>
                                <p className="text-left"><strong>Dimenzije: </strong>{item.data.dimenzije} {" "}
                                    <strong>Broj stranica: </strong>{item.data.brojStranica} {" "}
                                    <strong>Vrsta stranica: </strong>{item.data.vrstaStranica} {" "}
                                    <strong>Korice: </strong>{item.data.korice} {" "}
                                    <strong>Korice izgled: </strong>{item.data.koriceIzgled || "-"} {" "}
                                    <strong>Boja stranica: </strong>{item.data.bojaStranica} {" "}
                                </p>
                                <p className="text-left">
                                    <strong>Vrsta kalendara: </strong>{item.data.vrstaKalendara} {" "}
                                    <strong>Kalendar: </strong>{item.data.kalendar || "-"} {" "}
                                    <strong>Posveta: </strong>{item.data.posveta || "-"}
                                </p>
                                        
                                <p className="font-semibold text-right text-lg"><strong className="text-pink-600">Cena: </strong>{item.data.cena} RSD</p>
                            </>
                            )}
                            {item.tip === "stiker" && (
                            <>
                                <h2 className="font-bold text-purple-800 text-xl text-left">Stiker</h2>
                                <p className="text-left"><strong>Opis: </strong>{item.data.opis}</p>
                                <p className="font-semibold text-right text-lg"><strong className="text-pink-600">Cena: </strong>{item.data.cena} RSD</p>
                            </>
                            )}

                        </div>            
                    </div>  
                ))}

                <div className="bg-purple-100 rounded-lg shadow p-6 mb-3 w-80 ml-auto">
                    <p className="font-bold text-lg text-pink-600">Ukupna cena: <i className="text-gray-800">{ukupnoString}</i></p>
                </div>
            </div>
        </section>
        
        <section className=" mx-auto px-4 py-12 grid gap-6 rounded-3xl w-200 mt-4">
                <KorisnikInfo k={k}></KorisnikInfo>
        </section>

        <div className="flex flex-col items-center">
            <form className="text-lg w-100">
             <label className="mt-1 text-purple-900"><strong>Unesite PTT broj: </strong></label>
             <input 
                type="text"
                name="ptt"
                defaultValue=""
                className="border rounded w-full text-center"
                onChange={(e) => {
                    // dozvoljava samo cifre
                    const onlyNumbers = e.target.value.replace(/\D/g, ""); //ukljanja sve sto nije broj
                    setPtt(onlyNumbers.slice(0, 5));
                }}
             />
             <label className="mt-1 text-purple-900"><strong>Unesite drugu adresu za dostavu: </strong></label>
             <input 
                type="text"
                name="adresa"
                defaultValue=""
                className="border rounded w-full text-center"
                onChange={(e) => setNovaAdresa(e.target.value)} 
             /> 
            </form>
        </div>
        
        
        <button
        onClick={handlePoruci}
            className="mt-6 w-70 bg-purple-600 rounded font-bold text-2xl text-white hover:bg-pink-500 py-2 px-3 mt-4">
            PORUČI
        </button>
        </div>
    );
}