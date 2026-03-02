import "dotenv/config";
import { koriceTabela, korisniciTabela, narudzbenicaTabela, planerTabela, proizvodTabela, stavkaNarudzbeniceTabela, stikerTabela } from "./schema";
import { db } from "./index";
import bcrypt from "bcrypt";

const hash = await bcrypt.hash("1233", 10);
await db.transaction(async (tx) => {
	await tx.insert(korisniciTabela).values([
    {
		id: "00000000-0000-0000-0000-000000000001",
	    username:"mau",
	    email:"mau@gmail.com",
	    ime:"Mau",
	    prezime:"Maunovic",
	    adresa:"ulica mau",
	    passHash:hash,
		uloga: "ulogovani"
    },
    {
		id: "00000000-0000-0000-0000-000000000002",
	    username:"kaca",
	    email:"kaca@gmail.com",
	    ime:"Kaca",
	    prezime:"Kacinovic",
	    adresa:"ulica kaca",
	    passHash:hash,
		uloga: "admin"
    },
    {
		id: "00000000-0000-0000-0000-000000000003",
	    username:"mina",
	    email:"mina@gmail.com",
	    ime:"Mina",
	    prezime:"Minic",
	    adresa:"ulica mina",
	    passHash:hash,
		uloga: "admin"
    },
	]);
});
//NAR
await db.transaction(async (tx) => {
	await tx.insert(narudzbenicaTabela).values([
    {
		id: "00000000-0000-0000-0000-000000000014",
		adresa: "ulica mau",
		pttBroj: 11000,
		ukupnaCena: 800.00,
		status: "u obradi",
		korisnikID: "00000000-0000-0000-0000-000000000001"
    },
    {
		id: "00000000-0000-0000-0000-000000000015",
		adresa: "ulica mina",
		pttBroj: 11000,
		ukupnaCena: 700.00,
		status: "u obradi",
		korisnikID: "00000000-0000-0000-0000-000000000003"
    },
    
	]);
});
//PROIZVOD
await db.transaction(async (tx) => {
	await tx.insert(proizvodTabela).values([
    {
		id: "00000000-0000-0000-0000-000000000020",
		tip: "stiker"	
    },
	{
		id: "00000000-0000-0000-0000-000000034442",
		tip: "stiker"	
    },
	{
		id: "00000000-0000-0000-0000-000000034443",
		tip: "stiker"	
    },
	{
		id: "00000000-0000-0000-0000-000000034444",
		tip: "stiker"	
    },
	{
		id: "00000000-0000-0000-0000-000000034445",
		tip: "stiker"	
    },
	{
		id: "00000000-0000-0000-0000-000000034446",
		tip: "stiker"	
    },
	{
		id: "00000000-0000-0000-0000-000000034447",
		tip: "stiker"	
    },
	{
		id: "00000000-0000-0000-0000-000000034448",
		tip: "stiker"	
    },
	/////////////////////////////////////////
    {
		id: "00000000-0000-0000-0000-000000000021",
		tip: "planer"	
    },
	]);
});
//STAVKA
await db.transaction(async (tx) => {
	await tx.insert(stavkaNarudzbeniceTabela).values([
    {
		id: "00000000-0000-0000-0000-000000000080",
		cena: 200,
		narudzbenicaID: "00000000-0000-0000-0000-000000000014",
		proizvodID: "00000000-0000-0000-0000-000000000020"	
    },
	{
		id: "00000000-0000-0000-0000-000000000081",
		cena: 600,
		narudzbenicaID: "00000000-0000-0000-0000-000000000014",
		proizvodID: "00000000-0000-0000-0000-000000000021"	
    },
    
	]);
});
//STIKER
await db.transaction(async (tx) => {
	await tx.insert(stikerTabela).values([
    {
		opis: "Leki maca",
		cena: 100.50,
		proizvodID: "00000000-0000-0000-0000-000000000020"	
    },
	{
		opis: "Kapibara",
		cena: 100,
		proizvodID: "00000000-0000-0000-0000-000000034442"	
    },
	{
		opis: "Kaktus",
		cena: 49.99,
		proizvodID: "00000000-0000-0000-0000-000000034443"	
    },
	{
		opis: "Ljubičast jednorog",
		cena: 100,
		proizvodID: "00000000-0000-0000-0000-000000034444"	
    },
	{
		opis: "Kravica",
		cena: 49.99,
		proizvodID: "00000000-0000-0000-0000-000000034445"	
    },
	{
		opis: "Pčela",
		cena: 49.99,
		proizvodID: "00000000-0000-0000-0000-000000034446"	
    },
	{
		opis: "Telefon",
		cena: 49.99,
		proizvodID: "00000000-0000-0000-0000-000000034447"	
    },
	{
		opis: "Karmin",
		cena: 49.99,
		proizvodID: "00000000-0000-0000-0000-000000034448"	
    },
	
	]);
});
//KORICE
await db.transaction(async (tx) => {
	await tx.insert(koriceTabela).values([
    {
		id: "00000000-0000-0000-0000-000000000150",
		tip: "patern",
		izgled: "flamingosi"	
    },
	{
		id: "00000000-0000-0000-0000-000000000151",
		tip: "boja",
		izgled: "plava"	
    },
	
	]);
});
await db.transaction(async (tx) => {
	await tx.insert(planerTabela).values([
    {
		posveta: "Jela Pešić",
		brojStranica: 140,
		dimenzije: "A5",
		bojaStranica: "svetlo roze",
		vrstaKalendara: "dd.MM.yyyy.",
		kalendar: "mart 2026",
		vrstaStranica: "tacke",
		cena: 600,
		proizvodID: "00000000-0000-0000-0000-000000000021",
		koriceID: "00000000-0000-0000-0000-000000000150"	
    },
	
	]);
});


process.exit(0);
