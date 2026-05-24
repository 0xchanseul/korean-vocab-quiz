import Dexie, { type Table } from 'dexie';
import type { QuizHistory, WrongAnswer } from '../types/quiz';
import type { Word } from '../types/word';

export class VocabularyQuizDatabase extends Dexie {
  words!: Table<Word, number>;
  quizHistories!: Table<QuizHistory, number>;
  wrongAnswers!: Table<WrongAnswer, number>;

  constructor() {
    super('chansle-aslak-vocabulary-quiz');

    this.version(1).stores({
      words: '++id, &[korean+norwegian], korean, norwegian, category, level',
      quizHistories: '++id, score, language, playedAt',
      wrongAnswers: '++id, wordId, createdAt'
    });
  }
}

export const db = new VocabularyQuizDatabase();
