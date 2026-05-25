import type { QuizLanguage } from '../types/quiz';

interface LanguageQuizIconProps {
  language: QuizLanguage;
}

export function LanguageQuizIcon({ language }: LanguageQuizIconProps) {
  const isKorean = language === 'korean';

  return (
    <span
      className={`language-quiz-icon ${isKorean ? 'language-quiz-icon-korean' : 'language-quiz-icon-norwegian'}`}
      aria-hidden="true"
    >
      <span className="language-quiz-bubble">{isKorean ? '한' : 'Å'}</span>
      <span className="language-quiz-spark">{isKorean ? 'ㄱ' : 'Ø'}</span>
    </span>
  );
}
