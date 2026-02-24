CREATE TABLE "korice" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tip" varchar,
	"izgled" varchar(100),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "planer" (
	"posveta" varchar(100),
	"brojStranica" integer,
	"dimenzije" varchar,
	"bojaStranica" varchar,
	"vrstaKalendara" varchar,
	"kalendar" varchar(100),
	"vrstaStranica" varchar,
	"cena" real,
	"proizvodID" uuid,
	"koriceID" uuid NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "proizvod" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tip" varchar,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "stavkaNarudzbenice" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cena" real,
	"narudzbenicaID" uuid NOT NULL,
	"proizvodID" uuid NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "stiker" (
	"opis" varchar(255),
	"cena" real,
	"id" uuid,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "planerNarudzbenica" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "planeri" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "template" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "planerNarudzbenica" CASCADE;--> statement-breakpoint
DROP TABLE "planeri" CASCADE;--> statement-breakpoint
DROP TABLE "template" CASCADE;--> statement-breakpoint
ALTER TABLE "narudzbenica" ALTER COLUMN "adresa" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "narudzbenica" ADD COLUMN "datum" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "narudzbenica" ADD COLUMN "ukupnaCena" real;--> statement-breakpoint
ALTER TABLE "narudzbenica" ADD COLUMN "status" varchar;--> statement-breakpoint
ALTER TABLE "narudzbenica" ADD COLUMN "korisnikID" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "planer" ADD CONSTRAINT "planer_proizvodID_proizvod_id_fk" FOREIGN KEY ("proizvodID") REFERENCES "public"."proizvod"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "planer" ADD CONSTRAINT "planer_koriceID_korice_id_fk" FOREIGN KEY ("koriceID") REFERENCES "public"."korice"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stavkaNarudzbenice" ADD CONSTRAINT "stavkaNarudzbenice_narudzbenicaID_narudzbenica_id_fk" FOREIGN KEY ("narudzbenicaID") REFERENCES "public"."narudzbenica"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stavkaNarudzbenice" ADD CONSTRAINT "stavkaNarudzbenice_proizvodID_proizvod_id_fk" FOREIGN KEY ("proizvodID") REFERENCES "public"."proizvod"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stiker" ADD CONSTRAINT "stiker_id_proizvod_id_fk" FOREIGN KEY ("id") REFERENCES "public"."proizvod"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "narudzbenica" ADD CONSTRAINT "narudzbenica_korisnikID_korisnici_id_fk" FOREIGN KEY ("korisnikID") REFERENCES "public"."korisnici"("id") ON DELETE no action ON UPDATE no action;