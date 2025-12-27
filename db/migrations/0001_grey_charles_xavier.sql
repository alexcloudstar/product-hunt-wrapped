CREATE TABLE "suggestions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"code" varchar(50) NOT NULL,
	"description" text,
	"status" varchar(50) DEFAULT 'RESEARCH' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "suggestions_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "upvotes" (
	"suggestion_id" uuid NOT NULL,
	"maker_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "upvotes_suggestion_id_maker_id_pk" PRIMARY KEY("suggestion_id","maker_id")
);
--> statement-breakpoint
ALTER TABLE "makers" ADD COLUMN "created_at" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "upvotes" ADD CONSTRAINT "upvotes_suggestion_id_suggestions_id_fk" FOREIGN KEY ("suggestion_id") REFERENCES "public"."suggestions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "upvotes" ADD CONSTRAINT "upvotes_maker_id_makers_id_fk" FOREIGN KEY ("maker_id") REFERENCES "public"."makers"("id") ON DELETE cascade ON UPDATE no action;