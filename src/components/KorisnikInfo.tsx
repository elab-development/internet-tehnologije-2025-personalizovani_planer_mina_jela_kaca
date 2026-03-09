"use client"

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

export default function KorisnikInfo({k}:KorisnikProps){

    if(k){
        console.log("jupi");
    }
    return(
        <div className="text-purple-900 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-purple-800 py-2">Podaci o korisniku:</h1>
            
            <div className="py-3 text-2xl w-fit px-5 border-4 border-double border-purple-600">
                <p><strong>username: </strong>{k.username}</p>
                <p><strong>email: </strong>{k.email}</p>
                <p><strong>ime: </strong>{k.ime}</p>
                <p><strong>prezime: </strong>{k.prezime}</p>
                <p><strong>adresa: </strong>{k.adresa}</p>
            </div>
            
        </div>
    );

}