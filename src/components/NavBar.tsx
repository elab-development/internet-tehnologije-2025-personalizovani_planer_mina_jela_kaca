"use client"

import Link from "next/link";
import {useAuth} from "@/components/AuthProvider";
import { useState } from "react";
import { RiUser3Line } from "@remixicon/react";
import { useRouter } from "next/navigation";
 


export function NavBar (){
    
    const {status, user, logout} = useAuth();
    const isLoggedIn = status === "autentifikovani";
    //provera da li je admin
    const isAdmin = status === "autentifikovani" && user?.uloga === "admin";
    const [open, setOpen] = useState(false); //prozor profila
    
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        setOpen(false);
    }

    return(

        <nav className="sticky top-0 w-full flex items-center justify-around py-5 px-24 border-b border-violet-800 bg-purple-800 font-bold text-[20px] z-50 text-white">
            <p className="text-pink-200 font-anton text-4xl">PerPl</p>

            <ul className="flex gap-10 text-lg">
                <Link rel="stylesheet" href="/"> Početna </Link>
                
                <Link rel="stylesheet" href="/kastomizacija"> Napravi svoj </Link>
                
                <Link rel="stylesheet" href="/prodavnica"> Prodavnica </Link>

                <Link rel="stylesheet" href="/korpa"> Korpa </Link>


                {/*admin strana gde su narudzbenice i korisnici, samo admin je vidi*/}
                {isAdmin &&
                    <Link rel="stylesheet" href="/admin-strana"> Admin </Link>
                }

                {/*Prijava ili Profil*/}
                {isLoggedIn ? (
                    <div className="relative  z-50">
                        <button
                            aria-label="Profil"
                            className="flex h-7 w-7 items-center cursor-pointer justify-center rounded-full bg-purple-100 text-purple-600 transition hover:bg-pink-200"
                            onClick={() => setOpen(prev => !prev)}
                        >   
                            <RiUser3Line className="h-4 w-4" />
                        </button>

                        <div
                            className={`z-50  absolute right-0 top-12  min-w-47.5 rounded-md border border-black/10 
                                bg-white p-2 text-sm shadow-md transition-all ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                        >
                            <span className="block px-2 py-1 text-purple-700 max-w-35 text-nowrap overflow-hidden ">
                                {user?.ime}{" ["}{user?.username}{"]"}
                            </span>

                            <button 
                                onClick={()=> {
                                    router.push("/profil"); //navigacija na 'use client' strani, ne izvrsava se dok korisnik ne klikne!
                                    setOpen(false);
                                }}                         
                                className="w-full text-left block rounded px-2 py-1 text-purple-800 hover:bg-pink-50"
                            >
                                Profil
                            </button>
                            
                            <button
                                onClick={handleLogout}
                                className="w-full text-left block rounded px-2 py-1 text-pink-600 hover:bg-pink-50"
                            >
                                Odjavi se
                            </button>
                        </div>
                    </div>
                ) : (
                    <Link
                        href="/log-in"
                        className="rounded text-white px-2  hover:text-pink-700"
                    >
                        Prijavi se
                    </Link>
                )}


            </ul>



        </nav>
           

    );

}