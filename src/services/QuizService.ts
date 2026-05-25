import { quizRepository } from '../repositories/QuizRepository';
import type {
  CustomQuizDirection,
  CustomQuizQuestion,
  QuizLanguage,
  QuizQuestion,
  QuizResult
} from '../types/quiz';
import type { Word } from '../types/word';
import { shuffle } from '../utils/shuffle';
import { wordService } from './WordService';

const QUESTION_COUNT = 10;
const CHOICE_COUNT = 4;

export class QuizService {
  async createQuizSet(language: QuizLanguage): Promise<QuizQuestion[]> {
    const words = await wordService.getEasyWords();

    if (words.length < QUESTION_COUNT) {
      throw new Error('퀴즈를 만들 단어가 부족해요.');
    }

    const selectedWords = shuffle(words).slice(0, QUESTION_COUNT);

    return selectedWords.map((word) => this.toQuestion(word, words, language));
  }

  async createCustomQuizSet(direction: CustomQuizDirection): Promise<CustomQuizQuestion[]> {
    const words = await wordService.getCustomWords();
    const selectedWords = shuffle(words).slice(0, Math.min(QUESTION_COUNT, words.length));

    return selectedWords.map((word) => this.toCustomQuestion(word, direction));
  }

  async recordResult(result: QuizResult): Promise<void> {
    const playedAt = new Date().toISOString();

    await quizRepository.saveHistory({
      score: result.score,
      language: result.language,
      playedAt
    });

    await quizRepository.saveWrongAnswers(
      result.wrongWordIds.map((wordId) => ({
        wordId,
        createdAt: playedAt
      }))
    );
  }

  private toQuestion(word: Word, words: Word[], language: QuizLanguage): QuizQuestion {
    if (!word.id) {
      throw new Error('저장된 단어 id를 찾을 수 없어요.');
    }

    const prompt = language === 'korean' ? word.korean : word.norwegian;
    const correctAnswer = language === 'korean' ? word.norwegian : word.korean;
    const answerKey = language === 'korean' ? 'norwegian' : 'korean';

    const distractors = shuffle(
      Array.from(
        new Set(
          words
            .filter((candidate) => candidate.id !== word.id)
            .map((candidate) => candidate[answerKey])
            .filter((answer) => answer !== correctAnswer)
        )
      )
    ).slice(0, CHOICE_COUNT - 1);

    return {
      wordId: word.id,
      prompt,
      correctAnswer,
      choices: shuffle([correctAnswer, ...distractors])
    };
  }

  private toCustomQuestion(word: Word, direction: CustomQuizDirection): CustomQuizQuestion {
    if (!word.id) {
      throw new Error('저장된 단어 id를 찾을 수 없어요.');
    }

    return {
      wordId: word.id,
      prompt: direction === 'learnKorean' ? word.norwegian : word.korean,
      correctAnswer: direction === 'learnKorean' ? word.korean : word.norwegian
    };
  }
}

export const quizService = new QuizService();
