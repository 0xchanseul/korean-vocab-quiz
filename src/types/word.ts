export type WordLevel = 'easy' | 'medium' | 'hard';
export type WordSource = 'default' | 'custom';

export interface Word {
  id?: number;
  korean: string;
  norwegian: string;
  category: string;
  level: WordLevel;
  source: WordSource;
  createdAt: string;
  updatedAt: string;
}

export type SeedWord = Omit<Word, 'id' | 'createdAt' | 'updatedAt'>;
