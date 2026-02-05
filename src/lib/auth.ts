import * as jwt from 'jsonwebtoken'

export const AUTH_COOKIE = "auth";
const JWT_SECRET = process.env.JWT_SECRET!;

if(!JWT_SECRET){
    throw new Error("Nedostaje JWT kljuc u .env fajl!");
}

//definicija izgleda tokena
export type JWTKorisnikClaims = {
    sub: string; //id
    username: string,
    email: string;
    ime?: string;
    prezime?: string;
    adresa?: string;
    uloga: string;  //?
}

//pravljenje tokena
export function signAuthToken(claims: JWTKorisnikClaims){
    return jwt.sign(claims, JWT_SECRET, {algorithm:'HS256', expiresIn: "7d"})
}

//verifikaciju tokena
export function verifyAuthToken(token: string){
    const payload = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & JWTKorisnikClaims;

    if(!payload || !payload.sub || !payload.email){
        throw new Error("Invalidan je token")
    }

    return {
        sub: payload.sub,
        username: payload.username,
        email: payload.email,
        ime: payload.ime,
        prezime: payload.prezime,
        adresa: payload.adresa,
        uloga: payload.uloga
    }
}

export function cookieOpts(){
    return {
        httpOnly: true, //ne moze da se pristupi ovom cookie - samo preko http zahteva
        sameSite: "lax" as const,  //da sprecimo zlouptrebu cookie-ja
        secure: process.env.NODE_ENV === "production", // kad je aplikacija na produkciji moze samo da prihvata https zahteve
        path: "/",
        maxAge: 60 * 60 * 24 *7
    }
}