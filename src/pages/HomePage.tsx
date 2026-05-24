import { Heart, Sparkles } from 'lucide-react';
import { AppLogo } from '../components/AppLogo';
import { LanguageButton } from '../components/LanguageButton';
import type { QuizLanguage } from '../types/quiz';

interface HomePageProps {
  isLoading: boolean;
  errorMessage: string | null;
  onStartQuiz: (language: QuizLanguage) => void;
}

export function HomePage({ isLoading, errorMessage, onStartQuiz }: HomePageProps) {
  return (
    <section className="home-page">
      <AppLogo />

      <div className="title-group">
        <div className="kicker">
          <Heart size={18} aria-hidden="true" />
          찬슬 x Aslak
        </div>
        <h1>찬슬이와 Aslak의 재미있는 vocabulary quiz</h1>
        <p>오늘은 어느 방향으로 단어를 맞혀볼까요?</p>
      </div>

      <div className="language-grid" aria-label="퀴즈 언어 선택">
        <LanguageButton
          language="korean"
          flag="🇰🇷"
          label="한국어"
          disabled={isLoading}
          onClick={onStartQuiz}
        />
        <LanguageButton
          language="norwegian"
          flag="🇳🇴"
          label="노르웨이어"
          disabled={isLoading}
          onClick={onStartQuiz}
        />
      </div>

      <div className="tiny-note">
        <Sparkles size={16} aria-hidden="true" />
        10문제씩 가볍게, 오프라인에서도 말랑하게
      </div>

      {isLoading && <p className="status-message">단어를 준비하고 있어요...</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </section>
  );
}
