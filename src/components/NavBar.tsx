import Link from "next/link";

export function NavBar (){
    return(
        
        <nav className="fixed top-0 w-full flex items-center justify-around py-5 
                        px-24 border-b border-pink-500 bg-pink-300 font-bold text-[18px]">
            <p>Ovo je navbar - Plan2Party</p>

            <ul className="flex gap-10 text-lg">
                <Link rel="stylesheet" href="/log-in"> 
                    Login
                </Link>
                <Link rel="stylesheet" href="https://cat-bounce.com/"> 
                    Mau
                </Link>
            </ul>



        </nav>
           

    );

}