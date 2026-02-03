import "dotenv/config";
import { korisniciTabela, planeriTabela  } from "./schema";
import { db } from "./index";
import bcrypt from "bcrypt";
import { date } from "drizzle-orm/mysql-core";

const hash = await bcrypt.hash("1233", 10);

await db.transaction(async (tx) => {
    await tx.insert(korisniciTabela).values([
    {
	    username:"mau",
	    email:"mau@gmail.com",
	    ime:"Mau",
	    prezime:"Maunovic",
	    adresa:"ulica mau",
	    passHash:hash
    },
    {
	    username:"kaca",
	    email:"kaca@gmail.com",
	    ime:"Kaca",
	    prezime:"Kacinovic",
	    adresa:"ulica kaca",
	    passHash:hash
    },
    {
	    username:"mina",
	    email:"mina@gmail.com",
	    ime:"Mina",
	    prezime:"Minic",
	    adresa:"ulica mina",
	    passHash:hash
    },
]);
});

await db.transaction(async (tx) => {
    await tx.insert(planeriTabela).values([
    {
	    naziv: "planer A",
		naslovnaStrana: "planer za bilje",
		brojStranica: 40,
		dizajnKorica: "viticasto",
		bojaStranica: "plava",
		vrstaKalendara: "2025-01-02",
		vrstaStranica: "kocke",
		
    },
    {
	    naziv: "planer B",
		naslovnaStrana: "planer za dnevnik",
		brojStranica: 60,
		dizajnKorica: "male",
		bojaStranica: "roza",
		vrstaKalendara: "10-10-2025",
		vrstaStranica: "linije",
		
    },
]);
});

process.exit(0);
