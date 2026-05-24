import { ArrowLeft, ArrowRight, PartyPopper } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { ChoiceButton } from '../components/ChoiceButton';
import { ProgressBar } from '../components/ProgressBar';
import { useQuizSession } from '../hooks/useQuizSession';
import type { QuizLanguage, QuizQuestion, QuizResult } from '../types/quiz';

interface QuizPageProps {
  language: QuizLanguage;
  questions: QuizQuestion[];
  onFinish: (result: QuizResult) => void;
  onQuit: () => void;
}

export function QuizPage({ language, questions, onFinish, onQuit }: QuizPageProps) {
  const hasSubmittedResult = useRef(false);
  const {
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
  } = useQuizSession(questions, language);

  useEffect(() => {
    if (isFinished && !hasSubmittedResult.current) {
      hasSubmittedResult.current = true;
      void onFinish(result);
    }
  }, [isFinished, onFinish, result]);

  if (!currentQuestion) {
    return (
      <section className="quiz-page">
        <p className="status-message">문제를 불러오고 있어요...</p>
      </section>
    );
  }

  const promptLabel = language === 'korean' ? '한국어 단어' : '노르웨이어 단어';
  const answerLabel = language === 'korean' ? '노르웨이어 뜻' : '한국어 뜻';

  return (
    <section className="quiz-page">
      <header className="quiz-header">
        <button type="button" className="icon-button" onClick={onQuit} aria-label="처음으로">
          <ArrowLeft size={22} />
        </button>
        <ProgressBar current={currentIndex + 1} total={questions.length} />
      </header>

      <article className="quiz-card">
        <div className="quiz-meta">
          <span>{promptLabel}</span>
          <strong>{score}점</strong>
        </div>
        <h2>{currentQuestion.prompt}</h2>
        <p>{answerLabel}을 골라주세요</p>
      </article>

      <div className="choices">
        {currentQuestion.choices.map((answer) => (
          <ChoiceButton
            key={answer}
            answer={answer}
            correctAnswer={currentQuestion.correctAnswer}
            disabled={isAnswered}
            selectedAnswer={selectedAnswer}
            onChoose={chooseAnswer}
          />
        ))}
      </div>

      {isAnswered && (
        <section className={`feedback ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
          {isCorrect ? (
            <>
              <PartyPopper size={24} aria-hidden="true" />
              <strong>{cheer}</strong>
            </>
          ) : (
            <>
              <strong>정답은 {currentQuestion.correctAnswer}</strong>
              <span>괜찮아요. 다음에 더 자연스럽게 떠오를 거예요.</span>
            </>
          )}

          <button type="button" className="primary-button" onClick={goNext}>
            <span>{currentIndex === questions.length - 1 ? '결과 보기' : '다음 문제'}</span>
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        </section>
      )}
    </section>
  );
}
