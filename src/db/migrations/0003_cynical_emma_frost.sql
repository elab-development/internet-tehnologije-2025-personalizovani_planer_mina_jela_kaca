CREATE TABLE "planerNarudzbenica" (
	"datumNarudzbine" date,
	"opis" varchar(100)
);
--> statement-breakpoint
CREATE TABLE "planeri" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"naziv" varchar(100) NOT NULL,
	"naslovnaStrana" varchar(100) NOT NULL,
	"brojStranica" integer,
	"dizajnKorica" varchar(100) NOT NULL,
	"vrstaKalendara" date,
	"vrstaStranica" varchar,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "template" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tip" varchar(100) NOT NULL,
	"beleske" boolean,
	"format" varchar(100) NOT NULL
);
