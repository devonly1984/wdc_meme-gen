CREATE TABLE IF NOT EXISTS "favorite_count" (
	"id" text PRIMARY KEY NOT NULL,
	"memeId" text NOT NULL,
	"count" integer DEFAULT 0 NOT NULL
);
