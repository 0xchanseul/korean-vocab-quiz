import { ArrowLeft, BookPlus, PenLine } from 'lucide-react';
import { useEffect, useState } from 'react';
import { wordService } from '../services/WordService';
import type { CustomQuizDirection } from '../types/quiz';

interface CustomQuizIntroPageProps {
  onBack: () => void;
  onAddWord: () => void;
  onStart: (direction: CustomQuizDirection) => void;
}

export function CustomQuizIntroPage({ onBack, onAddWord, onStart }: CustomQuizIntroPageProps) {
  const [customWordCount, setCustomWordCount] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    wordService.getCustomWords().then((words) => {
      if (isMounted) {
        setCustomWordCount(words.length);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="form-page">
      <header className="quiz-header">
        <button type="button" className="icon-button" onClick={onBack} aria-label="처음으로">
          <ArrowLeft size={22} />
        </button>
      </header>

      <div className="form-card">
        <div className="form-icon">
          <PenLine size={34} aria-hidden="true" />
        </div>
        <h1>커스텀 단어 퀴즈</h1>
        <p>직접 추가한 단어만 입력형으로 연습해요.</p>

        {customWordCount === null && <p className="status-message">단어를 확인하고 있어요...</p>}

        {customWordCount === 0 && (
          <div className="empty-state">
            <strong>아직 추가한 단어가 없어요</strong>
            <button type="button" className="primary-button" onClick={onAddWord}>
              <BookPlus size={20} aria-hidden="true" />
              단어 추가하기
            </button>
          </div>
        )}

        {customWordCount !== null && customWordCount > 0 && (
          <div className="custom-direction-grid">
            <button
              type="button"
              className="direction-button"
              onClick={() => onStart('learnKorean')}
            >
              <strong>Jeg vil lære koreansk!</strong>
              <span>한국어를 공부할래!</span>
            </button>
            <button
              type="button"
              className="direction-button"
              onClick={() => onStart('learnNorwegian')}
            >
              <strong>Jeg vil lære norsk!</strong>
              <span>노르웨이어를 공부할래!</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
