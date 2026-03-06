

//ZAŠTITA??

import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://zenquotes.io/api/quotes/");
  var data = await res.json();
  return NextResponse.json(data);
}