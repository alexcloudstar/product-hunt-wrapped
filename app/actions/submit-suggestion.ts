'use server';

import { db } from '@/db';
import { suggestions } from '@/db/schema';
import { revalidatePath } from 'next/cache';

export async function submitSuggestion(title: string) {
  if (!title || title.trim().length < 3) {
    return { error: 'INPUT_TOO_SHORT' };
  }

  try {
    const prefix =
      title
        .split(' ')[0]
        .replace(/[^a-zA-Z]/g, '')
        .toUpperCase() || 'MOD';
    const generatedCode = `${prefix}_${Math.floor(
      100 + Math.random() * 899 + 100
    )}`;

    await db.insert(suggestions).values({
      title: title.trim(),
      code: generatedCode,
      status: 'RESEARCH',
    });

    revalidatePath('/roadmap');

    return { success: true, code: generatedCode };
  } catch (error) {
    console.error('DB Error:', error);
    return { error: 'SYSTEM_REJECTED_ENTRY' };
  }
}
