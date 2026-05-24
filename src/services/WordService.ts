import { seedInitialWords } from '../db/seed';
import { wordRepository } from '../repositories/WordRepository';
import type { Word } from '../types/word';

export class WordService {
  async initializeWords(): Promise<void> {
    await seedInitialWords();
  }

  async getEasyWords(): Promise<Word[]> {
    await this.initializeWords();
    return wordRepository.findByLevel('easy');
  }
}

export const wordService = new WordService();
