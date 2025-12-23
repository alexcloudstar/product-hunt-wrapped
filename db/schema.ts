import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const makers_table = pgTable('makers', {
  id: uuid('id').defaultRandom().primaryKey(),
  username: varchar('username', { length: 255 }).notNull().unique(),
});
