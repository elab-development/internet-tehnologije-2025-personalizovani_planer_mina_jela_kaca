
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

import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://zenquotes.io/api/quotes/");
  var data = await res.json();
  return NextResponse.json(data);
}