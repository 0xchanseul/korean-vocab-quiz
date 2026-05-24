import { useMemo, useState } from 'react';
import type { QuizQuestion, QuizResult, QuizLanguage } from '../types/quiz';

const cheers = ['Good Job 💙', '잘했어요 🎉', 'Bra jobbet 🇳🇴', '완전 멋져요 ✨'];

export const useQuizSession = (questions: QuizQuestion[], language: QuizLanguage) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [wrongWordIds, setWrongWordIds] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  const cheer = useMemo(() => cheers[Math.floor(Math.random() * cheers.length)], [currentIndex]);

  const chooseAnswer = (answer: string) => {
    if (isAnswered || !currentQuestion) {
      return;
    }

    setSelectedAnswer(answer);

    if (answer === currentQuestion.correctAnswer) {
      setScore((currentScore) => currentScore + 1);
    } else {
      setWrongWordIds((ids) => [...ids, currentQuestion.wordId]);
    }
  };

  const goNext = () => {
    if (currentIndex >= questions.length - 1) {
      setIsFinished(true);
      return;
    }

    setCurrentIndex((index) => index + 1);
    setSelectedAnswer(null);
  };

  const result: QuizResult = {
    score,
    total: questions.length,
    language,
    wrongWordIds
  };

  return {
    cheer,
    chooseAnswer,
    currentIndex,
    currentQuestion,
    goNext,
    isAnswered,
    isCorrect,
    isFinished,
    result,
    score,
    selectedAnswer
  };
};
