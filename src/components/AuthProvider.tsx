"use client"

import { useRouter } from "next/navigation";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type User = 
    {id: string; username: string; email: string; ime: string; prezime: string; 
        adresa: string; uloga: string; createdAt: string} 

//tip koji definise stanje koje zelimo da delimo (status i user)
type AuthState = {status: "ucitavanje"; user: null} 
        | {status: "neautentifikovani", user: null} 
        | {status: "autentifikovani", user: User};


//Ctx kao tip podataka koji prosledjujemo Context-ReactHook (sadrzi stanje + f-je AuthProvider-a)        
type Ctx = AuthState & {
    refresh: ()=> Promise<void>
    logout: () => Promise<void>
};

const AuthContext = createContext<Ctx | null>(null);

//
export function AuthProvider( {children}: {children: React.ReactNode}){

    const router = useRouter()
    const [state, setState] = useState<AuthState>({status: "ucitavanje", user: null})

    const refresh = useCallback( async() => {
        try {
            const rez = await fetch("/api/auth/me", {credentials: "include"})
            const data = await rez.json()

            if(!data || !data?.user){
                setState({status: "neautentifikovani", user:null}) 
            }else{
                setState({status: "autentifikovani", user: data.user})
            }

        } catch {
            setState({status: "neautentifikovani", user:null})
        }
    }, [])

     
    const logout = async () =>{
        const rez = await fetch("/api/auth/logout", {method: "POST", credentials: "include"})
        setState({status: "neautentifikovani", user:null})
        router.refresh()
    }
    

    useEffect(()=> {
        refresh()
    }, [refresh])

    const value = useMemo<Ctx>(() => ({...state,refresh,logout}), [state, refresh, logout])
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}

export function useAuth(){
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error("useAuth mora biti unutar AuthProvider-a")
    return ctx;
}