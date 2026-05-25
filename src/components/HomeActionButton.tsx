import type { ReactNode } from 'react';

interface HomeActionButtonProps {
  icon: ReactNode;
  label: string;
  disabled?: boolean;
  onClick: () => void;
}

export function HomeActionButton({ icon, label, disabled = false, onClick }: HomeActionButtonProps) {
  return (
    <button type="button" className="language-button home-action-button" disabled={disabled} onClick={onClick}>
      <span className="language-flag">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
