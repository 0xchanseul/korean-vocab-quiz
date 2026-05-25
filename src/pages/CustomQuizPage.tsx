import { ArrowLeft, ArrowRight, Eye, PartyPopper } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { ProgressBar } from '../components/ProgressBar';
import type { CustomQuizDirection, CustomQuizQuestion } from '../types/quiz';

interface CustomQuizPageProps {
  direction: CustomQuizDirection;
  questions: CustomQuizQuestion[];
  onFinish: (score: number, total: number) => void;
  onQuit: () => void;
}

const normalizeAnswer = (answer: string) => answer.trim().toLocaleLowerCase();

export function CustomQuizPage({ direction, questions, onFinish, onQuit }: CustomQuizPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [answerState, setAnswerState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  const currentQuestion = questions[currentIndex];
  const inputLabel = direction === 'learnKorean' ? '한국어로 입력' : '노르웨이어로 입력';
  const promptLabel = direction === 'learnKorean' ? '노르웨이어 보기' : '한국어 보기';
  const canSubmit = answer.trim().length > 0 && answerState === 'idle';

  const submitAnswer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit || !currentQuestion) {
      return;
    }

    if (normalizeAnswer(answer) === normalizeAnswer(currentQuestion.correctAnswer)) {
      setScore((currentScore) => currentScore + 1);
      setAnswerState('correct');
    } else {
      setAnswerState('wrong');
    }
  };

  const goNext = () => {
    if (currentIndex >= questions.length - 1) {
      onFinish(score, questions.length);
      return;
    }

    setCurrentIndex((index) => index + 1);
    setAnswer('');
    setAnswerState('idle');
    setIsAnswerVisible(false);
  };

  if (!currentQuestion) {
    return (
      <section className="quiz-page">
        <p className="status-message">문제를 불러오고 있어요...</p>
      </section>
    );
  }

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
        <p>{inputLabel}해주세요</p>
      </article>

      <form className="custom-answer-form" onSubmit={submitAnswer}>
        <label>
          <span>{inputLabel}</span>
          <input
            type="text"
            value={answer}
            disabled={answerState !== 'idle'}
            autoFocus
            onChange={(event) => setAnswer(event.target.value)}
          />
        </label>

        {answerState === 'idle' && (
          <button type="submit" className="primary-button" disabled={!canSubmit}>
            확인
          </button>
        )}
      </form>

      {answerState === 'correct' && (
        <section className="feedback feedback-correct">
          <strong>
            <PartyPopper size={24} aria-hidden="true" />
            Bra jobbet 🇳🇴
          </strong>
          <button type="button" className="primary-button" onClick={goNext}>
            <span>{currentIndex === questions.length - 1 ? '결과 보기' : '다음 문제'}</span>
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        </section>
      )}

      {answerState === 'wrong' && (
        <section className="feedback feedback-wrong">
          <strong>Vil du tenke litt til?</strong>

          {!isAnswerVisible && (
            <button type="button" className="secondary-button" onClick={() => setIsAnswerVisible(true)}>
              <Eye size={20} aria-hidden="true" />
              Vis svaret
            </button>
          )}

          {isAnswerVisible && (
            <>
              <span>정답: {currentQuestion.correctAnswer}</span>
              <button type="button" className="primary-button" onClick={goNext}>
                <span>{currentIndex === questions.length - 1 ? '결과 보기' : '다음 문제'}</span>
                <ArrowRight size={20} aria-hidden="true" />
              </button>
            </>
          )}
        </section>
      )}
    </section>
  );
}
