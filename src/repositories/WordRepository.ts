import { db } from '../db/database';
import type { Word, WordLevel } from '../types/word';

export class WordRepository {
  async findAll(): Promise<Word[]> {
    return db.words.toArray();
  }

  async findByLevel(level: WordLevel): Promise<Word[]> {
    return db.words.where('level').equals(level).toArray();
  }

  async count(): Promise<number> {
    return db.words.count();
  }

  // TODO: future backend integration - replace Dexie queries with API calls.
}

export const wordRepository = new WordRepository();
