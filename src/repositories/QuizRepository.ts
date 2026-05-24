import { db } from '../db/database';
import type { QuizHistory, WrongAnswer } from '../types/quiz';

export class QuizRepository {
  async saveHistory(history: Omit<QuizHistory, 'id'>): Promise<number> {
    return db.quizHistories.add(history);
  }

  async saveWrongAnswers(wrongAnswers: Omit<WrongAnswer, 'id'>[]): Promise<void> {
    if (wrongAnswers.length === 0) {
      return;
    }

    await db.wrongAnswers.bulkAdd(wrongAnswers);
  }

  async findRecentHistories(limit = 10): Promise<QuizHistory[]> {
    return db.quizHistories.orderBy('playedAt').reverse().limit(limit).toArray();
  }

  // TODO: future backend integration - replace Dexie persistence with REST API calls.
}

export const quizRepository = new QuizRepository();
