import { Languages } from 'lucide-react';
import type { QuizLanguage } from '../types/quiz';

interface LanguageButtonProps {
  language: QuizLanguage;
  flag: string;
  label: string;
  disabled: boolean;
  onClick: (language: QuizLanguage) => void;
}

export function LanguageButton({ language, flag, label, disabled, onClick }: LanguageButtonProps) {
  return (
    <button
      type="button"
      className="language-button"
      disabled={disabled}
      onClick={() => onClick(language)}
    >
      <span className="language-flag">{flag}</span>
      <span>{label}</span>
      <Languages size={22} aria-hidden="true" />
    </button>
  );
}
