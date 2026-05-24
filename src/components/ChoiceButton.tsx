import { Check, X } from 'lucide-react';

interface ChoiceButtonProps {
  answer: string;
  correctAnswer: string;
  disabled: boolean;
  selectedAnswer: string | null;
  onChoose: (answer: string) => void;
}

export function ChoiceButton({
  answer,
  correctAnswer,
  disabled,
  selectedAnswer,
  onChoose
}: ChoiceButtonProps) {
  const isSelected = selectedAnswer === answer;
  const isCorrect = answer === correctAnswer;
  const stateClass = disabled
    ? isCorrect
      ? 'choice-correct'
      : isSelected
        ? 'choice-wrong'
        : 'choice-muted'
    : '';

  return (
    <button
      type="button"
      className={`choice-button ${stateClass}`}
      disabled={disabled}
      onClick={() => onChoose(answer)}
    >
      <span>{answer}</span>
      {disabled && isCorrect && <Check size={22} aria-hidden="true" />}
      {disabled && isSelected && !isCorrect && <X size={22} aria-hidden="true" />}
    </button>
  );
}
