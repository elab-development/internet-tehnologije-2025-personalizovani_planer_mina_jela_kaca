import "dotenv/config";
import { korisniciTabela  } from "./schema";
import { db } from "./index";
import bcrypt from "bcrypt";

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

process.exit(0);
