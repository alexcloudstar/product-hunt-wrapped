'use server';

import { db } from '@/db';
import { upvotes } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { crypto } from 'next/dist/compiled/@edge-runtime/primitives'; // Standard Node/Next crypto

export async function addUpvote(suggestionId: string) {
  try {
    await db.insert(upvotes).values({
      id: crypto.randomUUID(),
      suggestionId: suggestionId,
    });

    revalidatePath('/roadmap');
    return { success: true };
  } catch (error) {
    console.error('VOTE_FAILURE //', error);
    return { success: false };
  }
}
