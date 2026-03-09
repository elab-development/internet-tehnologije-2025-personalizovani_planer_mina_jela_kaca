
import { integer, pgTable, varchar, uuid, timestamp, date, boolean, PgDate, real } from "drizzle-orm/pg-core";

export const korisniciTabela = pgTable("korisnici", {
    id: uuid("id").primaryKey().defaultRandom(),
    username: varchar("username", {length: 100}).notNull(),
    email: varchar("email", {length: 255}).notNull().unique(),
    ime: varchar("ime", {length: 100}).notNull(),
    prezime: varchar("prezime", {length: 100}).notNull(),
    adresa: varchar("adresa", {length: 100}).notNull(),
    passHash: varchar("pass_hash", {length: 255}).notNull(),
    uloga: varchar({enum: ["admin", "ulogovani"]}).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const narudzbenicaTabela = pgTable("narudzbenica", {
    id: uuid("id").primaryKey().defaultRandom(),
    adresa: varchar("adresa", {length: 100}),
    pttBroj: integer(),
    datum: timestamp("datum").defaultNow(),
    ukupnaCena: real(),
    status: varchar({enum: ["u obradi", "potvrdjena", "odbijena"]}),
    korisnikID: uuid("korisnikID").notNull().references(()=>korisniciTabela.id), //fk - Korisnik
    createdAt: timestamp("created_at").defaultNow(),
}); 

export const stavkaNarudzbeniceTabela = pgTable("stavkaNarudzbenice", {
    id: uuid("id").primaryKey().defaultRandom(),
    kolicina: integer(),
    cena: real(), //cena proizvoda * kolicina
    narudzbenicaID: uuid("narudzbenicaID").notNull().references(()=>narudzbenicaTabela.id), //fk ka Narudzbenici
    proizvodID: uuid("proizvodID").notNull().references(()=>proizvodTabela.id), //fk ka Proizvod
    createdAt: timestamp("created_at").defaultNow(),
})

export const proizvodTabela = pgTable("proizvod", {
    id: uuid("id").primaryKey().defaultRandom(),
    tip: varchar({enum: ["planer", "stiker"]}),
    createdAt: timestamp("created_at").defaultNow(),
})

export const planerTabela = pgTable("planer", {
    posveta: varchar("posveta", {length: 100}),
    brojStranica: integer(),
    dimenzije: varchar({enum: ["A6", "B6", "A5", "A4"]}),
    bojaStranica: varchar({enum: ["bela", "svetlo roze", "svetlo plava", "svetlo zelena", "svetlo ljubičasta"]}), 
    vrstaKalendara: varchar("vrsta kalendara", {length:100}),
    kalendar: varchar("kalendar", {length: 100}), //npr: januar 2026 ... maj2026 ...
    vrstaStranica: varchar({enum: ["linije", "kocke", "tacke", "prazno"]}),
    cena: real(),
    ////
    proizvodID: uuid("proizvodID").primaryKey().references(()=>proizvodTabela.id), //fk ka Proizvod
    koriceID: uuid("koriceID").notNull().references(()=>koriceTabela.id),
    createdAt: timestamp("created_at").defaultNow(),
})

export const koriceTabela = pgTable("korice", {
    id: uuid("id").primaryKey().defaultRandom(),
    tip: varchar({enum: ["patern", "boja", "koža"]}),
    izgled: varchar("izgled", {length: 100}),
    createdAt: timestamp("created_at").defaultNow(),
})

export const stikerTabela = pgTable("stiker", {
    opis: varchar("opis", {length: 255}),
    cena: real(),
    proizvodID: uuid("proizvodID").primaryKey().references(()=>proizvodTabela.id),   //fk ka Proizvodu
    createdAt: timestamp("created_at").defaultNow(),
})