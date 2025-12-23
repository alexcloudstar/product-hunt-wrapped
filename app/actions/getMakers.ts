'use server';

import { db, makers_table } from '@/db';
import { eq } from 'drizzle-orm';

export const getMakers = async () => {
  const makers = await db.select().from(makers_table);

  return makers;
};

export const getMakerByUsername = async (username: string) => {
  const maker = await db
    .select()
    .from(makers_table)
    .where(eq(makers_table.username, username))
    .limit(1);

  return maker;
};
