export type QuizLanguage = 'korean' | 'norwegian';
export type CustomQuizDirection = 'learnKorean' | 'learnNorwegian';

export interface QuizQuestion {
  wordId: number;
  prompt: string;
  correctAnswer: string;
  choices: string[];
}

export interface CustomQuizQuestion {
  wordId: number;
  prompt: string;
  correctAnswer: string;
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
