"use client"

type Nar = {
    adresa: string | null;
    pttBroj: number | null;
    datum: Date | null;
    ukupnaCena: number | null;
}

type Proizvod = {
    prID: string;
    tip: "planer" | "stiker" | null;
}

type Stiker = {
    sID: string;
    opis: string | null;
    cena: number | null;
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
    cena: number | null;
    koriceTip: "patern" | "boja" | "koža" | null;
    koriceIzgled: string | null;
}

type Props = {
    narID: string;
    nar: Nar;
    proizvodi: Proizvod[];
    stikeri: Stiker[];
    planeri: Planer[];
}


export default function FakturaClient({narID, nar, proizvodi, stikeri, planeri}: Props){

    //neću da budem amerikanac
    const formatDatum = (datum: Date | null) => {
        if (!datum) return "-";
        const d = new Date(datum);
        const dan = String(d.getDate());
        const mesec = String(d.getMonth() + 1)
        const godina = d.getFullYear();
        return `${dan}.${mesec}.${godina}.`;
    }

    return(
        <div>
            <h1 className="text-4xl font-bold mb-4 text-pink-800">FAKTURA</h1>
            <div className="max-w-4xl mx-auto p-6 bg-purple-200 rounded shadow-md border-2 border-purple-400">
            {/* INFO O NARUDŽBENICI */}
            <h2 className="text-2xl font-bold mb-4 text-purple-800">Narudžbenica</h2>
            <div className="mb-6">
                <p><strong>ID:</strong> {narID}</p>
                <p><strong>Adresa:</strong> {nar.adresa || "-"}</p>
                <p><strong>PTT broj:</strong> {nar.pttBroj ?? "-"}</p>
                <p><strong>Datum:</strong> {formatDatum(nar.datum)}</p>
                <p><strong className="text-pink-700">Ukupna cena:</strong> {nar.ukupnaCena ?? 0} RSD</p>
            </div>

            {/* LISTA PLANERA */}
            {planeri.length > 0 && (
                <>
                    <h3 className="text-xl font-semibold text-purple-800 mb-2">Planeri</h3>
                    <div className="space-y-4">
                        {planeri.map((p) => (
                            <div key={p.pID} className="border border-2 border-purple-400 rounded p-4 bg-purple-100">
                                <p><strong>Tip:</strong> Planer</p>
                                <p><strong>ID proizvoda:</strong> {p.pID}</p>
                                <p><strong>Posveta:</strong> {p.posveta || "-"}</p>
                                <p><strong>Broj stranica:</strong> {p.brojStranica ?? "-"}</p>
                                <p><strong>Dimenzije:</strong> {p.dimenzije || "-"}</p>
                                <p><strong>Boja stranica:</strong> {p.bojaStranica || "-"}</p>
                                <p><strong>Vrsta kalendara:</strong> {p.vrstaKalendara || "-"}</p>
                                <p><strong>Kalendar:</strong> {p.kalendar || "-"}</p>
                                <p><strong>Vrsta stranica:</strong> {p.vrstaStranica || "-"}</p>
                                <p><strong>Korice tip:</strong> {p.koriceTip || "-"}</p>
                                <p><strong>Korice izgled:</strong> {p.koriceIzgled || "-"}</p>
                                <p><strong className="text-pink-600">Cena:</strong> {p.cena ?? 0} RSD</p>

                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* LISTA STIKERA */}
            {stikeri.length > 0 && (
                <>
                    <h3 className="text-xl font-semibold text-purple-800 mt-6 mb-2">Stikeri</h3>
                    <div className="space-y-4">
                        {stikeri.map((s) => (
                            <div key={s.sID} className="border rounded p-4 bg-purple-100">
                                <p><strong>Tip:</strong> Stiker</p>
                                <p><strong>ID proizvoda:</strong> {s.sID}</p>
                                <p><strong>Opis:</strong> {s.opis || "-"}</p>
                                <p><strong className="text-pink-600">Cena:</strong> {s.cena ?? 0} RSD</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
        </div>
    );
}