ALTER TABLE "narudzbenica" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "narudzbenica" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "narudzbenica" ALTER COLUMN "id" SET NOT NULL;