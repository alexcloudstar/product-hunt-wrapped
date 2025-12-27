ALTER TABLE "upvotes" RENAME COLUMN "maker_id" TO "id";--> statement-breakpoint
ALTER TABLE "upvotes" DROP CONSTRAINT "upvotes_maker_id_makers_id_fk";
--> statement-breakpoint
ALTER TABLE "upvotes" DROP CONSTRAINT "upvotes_suggestion_id_maker_id_pk";