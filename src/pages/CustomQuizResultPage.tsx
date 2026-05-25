import { Home, RotateCcw, Trophy } from 'lucide-react';

interface CustomQuizResultPageProps {
  score: number;
  total: number;
  onRestart: () => void;
  onHome: () => void;
}

export function CustomQuizResultPage({
  score,
  total,
  onRestart,
  onHome
}: CustomQuizResultPageProps) {
  return (
    <section className="result-page">
      <div className="result-badge">
        <Trophy size={42} aria-hidden="true" />
      </div>
      <h1>커스텀 퀴즈 끝!</h1>
      <p className="result-score">
        {score}
        <span>/ {total}</span>
      </p>
      <p className="result-message">직접 추가한 표현이라 더 빨리 익숙해질 거예요.</p>

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
