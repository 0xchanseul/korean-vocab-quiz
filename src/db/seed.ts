import { initialWords } from '../data/initialWords';
import { db } from './database';

export const seedInitialWords = async () => {
  const now = new Date().toISOString();

  await db.transaction('rw', db.words, async () => {
    for (const word of initialWords) {
      const existing = await db.words
        .where('[korean+norwegian]')
        .equals([word.korean, word.norwegian])
        .first();

      if (!existing) {
        await db.words.add({
          ...word,
          createdAt: now,
          updatedAt: now
        });
      }
    }
  });
};
