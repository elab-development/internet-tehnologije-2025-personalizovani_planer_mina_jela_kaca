
import { integer, pgTable, varchar, uuid, timestamp } from "drizzle-orm/pg-core";

export const korisniciTabela = pgTable("korisnici", {
    id: uuid("id").primaryKey().defaultRandom(),
    username: varchar("username", {length: 100}).notNull(),
    email: varchar("email", {length: 255}).notNull().unique(),
    ime: varchar("ime", {length: 100}).notNull(),
    prezime: varchar("prezime", {length: 100}).notNull(),
    adresa: varchar("adresa", {length: 100}).notNull(),
    passHash: varchar("pass_hash", {length: 255}).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const narudzbenicaTabela = pgTable("narudzbenica", {
    id: uuid("id").primaryKey().defaultRandom(),
    adresa: varchar("adresa", {length: 100}).notNull(),
    pttBroj: integer(),
    createdAt: timestamp("created_at").defaultNow(),
}); 