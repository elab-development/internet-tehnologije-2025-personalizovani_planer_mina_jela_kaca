CREATE TABLE "narudzbenica" (
	"id" uuid,
	"adresa" varchar(100) NOT NULL,
	"pttBroj" integer,
	"created_at" timestamp DEFAULT now()
);
