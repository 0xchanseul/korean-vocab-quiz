import { Languages } from 'lucide-react';
import type { ReactNode } from 'react';
import type { QuizLanguage } from '../types/quiz';

interface LanguageButtonProps {
  language: QuizLanguage;
  icon: ReactNode;
  label: string;
  disabled: boolean;
  onClick: (language: QuizLanguage) => void;
}

export function LanguageButton({ language, icon, label, disabled, onClick }: LanguageButtonProps) {
  return (
    <button
      type="button"
      className="language-button"
      disabled={disabled}
      onClick={() => onClick(language)}
    >
      <span className="language-flag">{icon}</span>
      <span>{label}</span>
      <Languages size={22} aria-hidden="true" />
    </button>
  );
}
