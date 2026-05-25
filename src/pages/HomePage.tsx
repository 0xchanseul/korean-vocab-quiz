import { BookPlus, Heart, Sparkles, Target } from 'lucide-react';
import { AppLogo } from '../components/AppLogo';
import { HomeActionButton } from '../components/HomeActionButton';
import { LanguageButton } from '../components/LanguageButton';
import type { QuizLanguage } from '../types/quiz';

interface HomePageProps {
  isLoading: boolean;
  errorMessage: string | null;
  onStartQuiz: (language: QuizLanguage) => void;
  onStartCustomQuiz: () => void;
  onAddWord: () => void;
}

export function HomePage({
  isLoading,
  errorMessage,
  onStartQuiz,
  onStartCustomQuiz,
  onAddWord
}: HomePageProps) {
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

      <div className="home-actions" aria-label="퀴즈 메뉴">
        <div className="language-grid">
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

        <div className="language-grid">
          <HomeActionButton
            icon={<Target size={26} aria-hidden="true" />}
            label="커스텀 단어 퀴즈"
            disabled={isLoading}
            onClick={onStartCustomQuiz}
          />
          <HomeActionButton
            icon={<BookPlus size={26} aria-hidden="true" />}
            label="단어 추가"
            disabled={isLoading}
            onClick={onAddWord}
          />
        </div>
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
