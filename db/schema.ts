import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const makers_table = pgTable('makers', {
  id: uuid('id').defaultRandom().primaryKey(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const suggestions = pgTable('suggestions', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  description: text('description'),
  status: varchar('status', { length: 50 }).default('RESEARCH').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const upvotes = pgTable('upvotes', {
  id: uuid('id').defaultRandom().primaryKey(),
  suggestionId: uuid('suggestion_id')
    .references(() => suggestions.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const suggestionsRelations = relations(suggestions, ({ many }) => ({
  upvotes: many(upvotes),
}));

export const upvotesRelations = relations(upvotes, ({ one }) => ({
  suggestion: one(suggestions, {
    fields: [upvotes.suggestionId],
    references: [suggestions.id],
  }),
}));
