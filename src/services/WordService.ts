import { seedInitialWords } from '../db/seed';
import { wordRepository } from '../repositories/WordRepository';
import type { Word } from '../types/word';

export class WordService {
  async initializeWords(): Promise<void> {
    await seedInitialWords();
  }

  async getEasyWords(): Promise<Word[]> {
    await this.initializeWords();
    return wordRepository.findByLevelAndSource('easy', 'default');
  }

  async getCustomWords(): Promise<Word[]> {
    await this.initializeWords();
    return wordRepository.findBySource('custom');
  }

  async addCustomWord(korean: string, norwegian: string): Promise<void> {
    await this.initializeWords();

    const normalizedKorean = korean.trim();
    const normalizedNorwegian = norwegian.trim();

    if (!normalizedKorean || !normalizedNorwegian) {
      throw new Error('한국어와 노르웨이어를 모두 입력해주세요.');
    }

    const existingWords = await wordRepository.findAll();
    const alreadyExists = existingWords.some(
      (word) =>
        word.korean.trim().toLowerCase() === normalizedKorean.toLowerCase() &&
        word.norwegian.trim().toLowerCase() === normalizedNorwegian.toLowerCase()
    );

    if (alreadyExists) {
      throw new Error('이미 저장된 단어예요.');
    }

    const now = new Date().toISOString();

    await wordRepository.add({
      korean: normalizedKorean,
      norwegian: normalizedNorwegian,
      category: 'custom',
      level: 'easy',
      source: 'custom',
      createdAt: now,
      updatedAt: now
    });
  }
}

export const wordService = new WordService();
