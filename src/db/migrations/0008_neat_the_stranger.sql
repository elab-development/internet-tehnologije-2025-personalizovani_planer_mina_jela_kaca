ALTER TABLE "planer" ADD PRIMARY KEY ("proizvodID");--> statement-breakpoint
ALTER TABLE "planer" ALTER COLUMN "proizvodID" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "stiker" ADD PRIMARY KEY ("proizvodID");--> statement-breakpoint
ALTER TABLE "stiker" ALTER COLUMN "proizvodID" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "planer" ADD COLUMN "vrsta kalendara" varchar(100);--> statement-breakpoint
ALTER TABLE "planer" DROP COLUMN "vrstaKalendara";