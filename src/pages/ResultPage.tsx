import { Home, RotateCcw, Trophy } from 'lucide-react';
import type { QuizResult } from '../types/quiz';

interface ResultPageProps {
  result: QuizResult;
  onRestart: () => void;
  onHome: () => void;
}

export function ResultPage({ result, onRestart, onHome }: ResultPageProps) {
  const message =
    result.score >= 9
      ? '둘이 같이 축하할 점수예요!'
      : result.score >= 6
        ? '좋아요. 오늘 단어 감각이 살아있어요.'
        : '천천히 다시 보면 금방 익숙해져요.';

  return (
    <section className="result-page">
      <div className="result-badge">
        <Trophy size={42} aria-hidden="true" />
      </div>
      <h1>퀴즈 끝!</h1>
      <p className="result-score">
        {result.score}
        <span>/ {result.total}</span>
      </p>
      <p className="result-message">{message}</p>

      <div className="result-actions">
        <button type="button" className="primary-button" onClick={onRestart}>
          <RotateCcw size={20} aria-hidden="true" />
          다시 시작
        </button>
        <button type="button" className="secondary-button" onClick={onHome}>
          <Home size={20} aria-hidden="true" />
          처음 화면
        </button>
      </div>
    </section>
  );
}
