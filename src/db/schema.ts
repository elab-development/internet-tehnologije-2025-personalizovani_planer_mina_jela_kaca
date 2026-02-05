
import { integer, pgTable, varchar, uuid, timestamp, date, boolean, PgDate } from "drizzle-orm/pg-core";

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
    adresa: varchar("adresa", {length: 100}).notNull(),
    pttBroj: integer(),
    status: varchar({enum: ["u obradi", "potvrdjena", "odbijena"]}),
    createdAt: timestamp("created_at").defaultNow(),
}); 

export const planeriTabela = pgTable("planeri", {
    id: uuid("id").primaryKey().defaultRandom(),
    naziv: varchar("naziv", {length: 100}).notNull(),
    naslovnaStrana: varchar("naslovnaStrana", {length: 100}).notNull(),
    brojStranica: integer(),
    dizajnKorica: varchar("dizajnKorica", {length: 100}).notNull(),
    bojaStranica: varchar("bojaStranica", {length: 100}).notNull(),
    vrstaKalendara: date("vrstaKalendara"),
    vrstaStranica: varchar({enum: ["linije", "kocke", "tacke", "prazno"]}),
    createdAt: timestamp("created_at").defaultNow(),
})

export const planerNarudzbenicaTabela = pgTable("planerNarudzbenica", {
    datumNarudzbine: date(),
    opis: varchar("opis", {length: 100})
})

export const templateTabela = pgTable("template", {
    id: uuid("id").primaryKey().defaultRandom(),
    tip: varchar("tip", {length: 100}).notNull(),
    beleske: boolean(),
    format: varchar("format", {length: 100}).notNull()
})