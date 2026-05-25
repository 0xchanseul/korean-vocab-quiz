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

    this.version(2)
      .stores({
        words: '++id, &[korean+norwegian], korean, norwegian, category, level, source',
        quizHistories: '++id, score, language, playedAt',
        wrongAnswers: '++id, wordId, createdAt'
      })
      .upgrade(async (transaction) => {
        await transaction
          .table<Word, number>('words')
          .toCollection()
          .modify((word) => {
            word.source = word.source ?? 'default';
            word.updatedAt = word.updatedAt ?? new Date().toISOString();
          });
      });
  }
}

export const db = new VocabularyQuizDatabase();
