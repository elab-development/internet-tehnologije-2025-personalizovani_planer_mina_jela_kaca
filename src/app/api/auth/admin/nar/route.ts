import { db } from "@/db";
import { korisniciTabela, narudzbenicaTabela } from "@/db/schema";
import { AUTH_COOKIE, verifyAuthToken } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}

type Req = {
    id: string;
    status: "u obradi" | "potvrdjena" | "odbijena";
}

export async function PUT(req:Request) {
    const token = (await cookies()).get(AUTH_COOKIE)?.value;
    if(!token) return NextResponse.json({error: "Nije autentifikovan"}, {status: 401});

    let adminID: string;
        adminID = verifyAuthToken(token).sub;
    
    const [admin] = await db
        .select({uloga: korisniciTabela.uloga})
        .from(korisniciTabela)
        .where(eq(korisniciTabela.id, adminID));
    
    if(!admin || admin.uloga !== "admin"){
        return NextResponse.json({error: "Zabranjen pristup korisniku"}, {status: 403});
    }

    const body: Req = await req.json();
     if (!body.id || !body.status) {
        return NextResponse.json(
        { error: "ID i status su obavezni!" },
        { status: 400 }
        );
    }

     await db
        .update(narudzbenicaTabela)
        .set({ status: body.status })
        .where(eq(narudzbenicaTabela.id, body.id));

    return NextResponse.json({ ok: true, id: body.id, status: body.status });
}
