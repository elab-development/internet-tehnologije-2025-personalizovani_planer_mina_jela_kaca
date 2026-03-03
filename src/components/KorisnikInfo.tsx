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
            <h1 className="text-3xl font-bold text-purple-800 py-3">Podaci o korisniku:</h1>
            
            <div className="py-3 text-lg w-fit px-5 border-4 border-dotted border-pink-600">
                <p><strong>username: </strong>{k.username}</p>
                <p><strong>email: </strong>{k.email}</p>
                <p><strong>ime: </strong>{k.ime}</p>
                <p><strong>prezime: </strong>{k.prezime}</p>
                <p><strong>adresa: </strong>{k.adresa}</p>
            </div>
            
            {/*ADRESA: ispisuje iz baze, ali korisnik moze da je promeni za individualnu narudzbinu*/}
            <form className="mt-4 text-lg">
                <label className="mt-1"><strong>Unesite drugu adresu za dostavu: </strong></label>
                <input 
                    type="text"
                    name="adresa"
                    defaultValue=""
                    className="border rounded w-full text-center" 
                />
            </form>
        </div>
    );

}