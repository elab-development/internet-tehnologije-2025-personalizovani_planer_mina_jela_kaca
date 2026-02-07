ALTER TABLE "stiker" DROP CONSTRAINT "stiker_id_proizvod_id_fk";
--> statement-breakpoint
ALTER TABLE "stiker" ADD COLUMN "proizvodID" uuid;--> statement-breakpoint
ALTER TABLE "stiker" ADD CONSTRAINT "stiker_proizvodID_proizvod_id_fk" FOREIGN KEY ("proizvodID") REFERENCES "public"."proizvod"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stiker" DROP COLUMN "id";