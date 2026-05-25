import { db } from '../db/database';
import type { Word, WordLevel, WordSource } from '../types/word';

export class WordRepository {
  async findAll(): Promise<Word[]> {
    return db.words.toArray();
  }

  async findByLevel(level: WordLevel): Promise<Word[]> {
    return db.words.where('level').equals(level).toArray();
  }

  async findByLevelAndSource(level: WordLevel, source: WordSource): Promise<Word[]> {
    return db.words.where('level').equals(level).and((word) => word.source === source).toArray();
  }

  async findBySource(source: WordSource): Promise<Word[]> {
    return db.words.where('source').equals(source).toArray();
  }

  async add(word: Word): Promise<number> {
    return db.words.add(word);
  }

  async count(): Promise<number> {
    return db.words.count();
  }

  // TODO: future backend integration - replace Dexie queries with API calls.
}

export const wordRepository = new WordRepository();
