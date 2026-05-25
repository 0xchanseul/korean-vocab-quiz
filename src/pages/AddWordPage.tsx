import { ArrowLeft, BookPlus, Save } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { wordService } from '../services/WordService';

interface AddWordPageProps {
  onBack: () => void;
}

export function AddWordPage({ onBack }: AddWordPageProps) {
  const [korean, setKorean] = useState('');
  const [norwegian, setNorwegian] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const canSave = korean.trim().length > 0 && norwegian.trim().length > 0 && !isSaving;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSave) {
      return;
    }

    setIsSaving(true);
    setMessage(null);
    setErrorMessage(null);

    try {
      await wordService.addCustomWord(korean, norwegian);
      setKorean('');
      setNorwegian('');
      setMessage('저장됐어요! 커스텀 퀴즈에서 바로 만날 수 있어요.');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '단어를 저장하지 못했어요.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="form-page">
      <header className="quiz-header">
        <button type="button" className="icon-button" onClick={onBack} aria-label="처음으로">
          <ArrowLeft size={22} />
        </button>
      </header>

      <div className="form-card">
        <div className="form-icon">
          <BookPlus size={34} aria-hidden="true" />
        </div>
        <h1>단어 추가</h1>
        <p>둘만의 표현을 살짝 저장해볼까요?</p>

        <form className="word-form" onSubmit={handleSubmit}>
          <label>
            <span>한국어</span>
            <input
              type="text"
              value={korean}
              placeholder="예: 개웃겨"
              onChange={(event) => setKorean(event.target.value)}
            />
          </label>

          <label>
            <span>노르웨이어</span>
            <input
              type="text"
              value={norwegian}
              placeholder="예: sykt morsomt"
              onChange={(event) => setNorwegian(event.target.value)}
            />
          </label>

          <button type="submit" className="primary-button" disabled={!canSave}>
            <Save size={20} aria-hidden="true" />
            저장
          </button>
        </form>

        {message && <p className="success-message">{message}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </section>
  );
}
