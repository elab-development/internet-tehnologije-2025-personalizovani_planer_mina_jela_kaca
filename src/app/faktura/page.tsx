
import FakturaClient from "@/app/faktura/FakturaClient"
import { AUTH_COOKIE } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { db } from "@/db";
import { koriceTabela, narudzbenicaTabela, planerTabela, proizvodTabela, stavkaNarudzbeniceTabela, stikerTabela } from "@/db/schema";
import { inArray, eq } from "drizzle-orm";

type Props = {
  searchParams: { id?: string } | Promise<{ id?: string }>;
};

type Proizvod = {
    prID: string;
    tip: "planer" | "stiker" | null;
}
type Stiker = {
    sID: string;
    opis: string | null;
    cena: number | null;
    kolicina: number;
    cenaKol: number; //cena*kolicina
}

type Planer = {
    pID: string;
    posveta: string | null;
    brojStranica: number | null;
    dimenzije: "A6" | "B6" | "A5" | "A4" | null;
    bojaStranica: "bela" | "svetlo roze" | "svetlo plava" | "svetlo zelena" | "svetlo ljubičasta" | null;
    vrstaKalendara: string | null;
    kalendar: string | null;
    vrstaStranica: "linije" | "kocke" | "tacke" | "prazno" | null;
    cena: number | null; //individualna cena
    koriceTip: "patern" | "boja" | "koža" | null;
    koriceIzgled: string | null;
    kolicina: number;
    cenaKol: number; //cena*kolicina
}


export default async function Faktura({searchParams}: Props) {
  
    const kolac = await cookies();
        const token = kolac.get(AUTH_COOKIE)?.value;
        if(!token){
            redirect("/log-in");
        }

    const {id} = await searchParams;
    if(!id){
        redirect("/");
    }

    //uzmemo info iz DB:
    const [nar] = await db
        .select({adresa: narudzbenicaTabela.adresa, pttBroj: narudzbenicaTabela.pttBroj, datum: narudzbenicaTabela.datum, ukupnaCena: narudzbenicaTabela.ukupnaCena})
        .from(narudzbenicaTabela)
        .where(eq(narudzbenicaTabela.id, id));

    const stavkeNar = await db
        .select({id: stavkaNarudzbeniceTabela.id, proizvodID: stavkaNarudzbeniceTabela.proizvodID, 
            kolicina: stavkaNarudzbeniceTabela.kolicina, cena: stavkaNarudzbeniceTabela.cena})
        .from(stavkaNarudzbeniceTabela)
        .where(eq(stavkaNarudzbeniceTabela.narudzbenicaID, id));

    const proizvodIDs = stavkeNar.map(stavka => stavka.proizvodID); //mapira sve ID proizvoda iz svih stavki naše Nar

    const proizvodiDB = await db
        .select({id: proizvodTabela.id, tip: proizvodTabela.tip})
        .from(proizvodTabela)
        .where(inArray(proizvodTabela.id, proizvodIDs));

    const proizvodi: Proizvod[] = proizvodiDB.map(p => ({
        prID: p.id,
        tip: p.tip,
    }));

    const stikeriDB = await db
        .select({sID: stikerTabela.proizvodID, opis: stikerTabela.opis, cena: stikerTabela.cena})
        .from(stikerTabela)
        .where(inArray(stikerTabela.proizvodID, proizvodIDs));

    const stikeri: Stiker[] = stikeriDB.map(s => {
        const stavka = stavkeNar.find(st => st.proizvodID === s.sID); //odgovarajuca stavka (za kolicinu i cenaKol)

        return {
            sID: s.sID,
            opis: s.opis,
            cena: s.cena ?? 0,
            kolicina: stavka?.kolicina ?? 1,
            cenaKol: stavka?.cena ?? s.cena ?? 0,
        };
    });
    
    const planeriDB = await db
        .select({pID: planerTabela.proizvodID, posveta: planerTabela.posveta,brojStranica: planerTabela.brojStranica, dimenzije: planerTabela.dimenzije,
            bojaStranica: planerTabela.bojaStranica ,vrstaKalendara: planerTabela.vrstaKalendara, kalendar: planerTabela.kalendar, vrstaStranica: planerTabela.vrstaStranica ,cena: planerTabela.cena,
            koriceTip: koriceTabela.tip, koriceIzgled: koriceTabela.izgled})
        .from(planerTabela).leftJoin(koriceTabela, eq(planerTabela.koriceID, koriceTabela.id))
        .where(inArray(planerTabela.proizvodID, proizvodIDs));
        

    const planeri: Planer[] = planeriDB.map(p => {
    const stavka = stavkeNar.find(s => s.proizvodID === p.pID); //pronalazi odgovarajucu
    return {
        pID: p.pID,
        posveta: p.posveta,
        brojStranica: p.brojStranica,
        dimenzije: p.dimenzije,
        bojaStranica: p.bojaStranica,
        vrstaKalendara: p.vrstaKalendara,
        kalendar: p.kalendar,
        vrstaStranica: p.vrstaStranica,
        cena: p.cena,
        koriceTip: p.koriceTip,
        koriceIzgled: p.koriceIzgled,
        kolicina: stavka?.kolicina ?? 1,
        cenaKol: stavka?.cena ?? p.cena ?? 0
    }
});

    return (
        <main className="min-h-screen bg-purple-100 font-sans">
            <div className="py-16 text-center">
        
                <FakturaClient narID={id} nar={nar} proizvodi={proizvodi} stikeri={stikeri} planeri={planeri}/>

            </div>
        </main>
    );
}