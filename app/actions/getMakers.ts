'use server';

import { db, makers_table } from '@/db';

export const getMakers = async () => {
  const makers = await db.select().from(makers_table);

  return makers;
};
