import { BookOpen, PenLine } from 'lucide-react';

export function CustomQuizIcon() {
  return (
    <span className="custom-quiz-icon" aria-hidden="true">
      <BookOpen className="custom-quiz-book" size={29} strokeWidth={2.8} />
      <PenLine className="custom-quiz-pen" size={20} strokeWidth={3} />
    </span>
  );
}
