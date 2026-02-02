import { AUTH_COOKIE } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(){
    const res = NextResponse.json({ok: true})

    res.cookies.set(AUTH_COOKIE, "", {
        httpOnly: true, //ne moze da se pristupi ovom cookie jedino samo preko http zahteva
        sameSite: "lax" as const,  //da sprecimo zlouptrebu cookie-ja
        secure: process.env.NODE_ENV === "production", // kad je aplikacija na produkciji moze samo da prihvata https zahteve
        path: "/",
        maxAge: 0,
        expires: new Date(0) //
   }) 

   return res;
}