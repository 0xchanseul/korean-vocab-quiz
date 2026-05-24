export type QuizLanguage = 'korean' | 'norwegian';

export interface QuizQuestion {
  wordId: number;
  prompt: string;
  correctAnswer: string;
  choices: string[];
}

export interface QuizHistory {
  id?: number;
  score: number;
  language: QuizLanguage;
  playedAt: string;
}

export interface WrongAnswer {
  id?: number;
  wordId: number;
  createdAt: string;
}

export interface QuizResult {
  score: number;
  total: number;
  language: QuizLanguage;
  wrongWordIds: number[];
}
