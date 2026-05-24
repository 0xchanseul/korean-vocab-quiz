export type WordLevel = 'easy' | 'medium' | 'hard';

export interface Word {
  id?: number;
  korean: string;
  norwegian: string;
  category: string;
  level: WordLevel;
  createdAt: string;
  updatedAt: string;
}

export type SeedWord = Omit<Word, 'id' | 'createdAt' | 'updatedAt'>;
