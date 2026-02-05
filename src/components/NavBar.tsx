import Link from "next/link";

export function NavBar (){
    return(
        
        <nav className="fixed top-0 w-full flex items-center justify-around py-5 
                        px-24 border-b border-violet-500 bg-violet-400 font-bold text-[18px]">
            <p>Ovo je navbar - Perpl</p>

            <ul className="flex gap-10 text-lg">
                <Link rel="stylesheet" href="/"> Početna </Link>
                
                <Link rel="stylesheet" href="/kastomizacija"> Napravi svoj </Link>
                
                <Link rel="stylesheet" href="/prodavnica"> Prodavnica </Link>

                <Link rel="stylesheet" href="/korpa"> Korpa </Link>

                <Link rel="stylesheet" href="/placanje"> Placanje </Link>

                {/*admin strana gde su narudzbenice i korisnici, samo admin je vidi*/}
                <Link rel="stylesheet" href="/admin-strana"> Admin </Link>

                {/*Login ako nije vec prijavljen, logout ako jeste*/}
                <Link rel="stylesheet" href="/log-in"> Login </Link>

                {/*jer me čini srećnom, sklonićemo kasnije*/}
                <Link rel="stylesheet" href="https://cat-bounce.com/"> 
                    Mau
                </Link>
            </ul>



        </nav>
           

    );

}