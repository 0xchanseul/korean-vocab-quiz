import { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { QuizPage } from './pages/QuizPage';
import { ResultPage } from './pages/ResultPage';
import { quizService } from './services/QuizService';
import type { QuizLanguage, QuizQuestion, QuizResult } from './types/quiz';

type AppView = 'home' | 'quiz' | 'result';

function App() {
  const [view, setView] = useState<AppView>('home');
  const [language, setLanguage] = useState<QuizLanguage>('korean');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const startQuiz = async (selectedLanguage: QuizLanguage) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const nextQuestions = await quizService.createQuizSet(selectedLanguage);
      setLanguage(selectedLanguage);
      setQuestions(nextQuestions);
      setView('quiz');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '퀴즈를 준비하지 못했어요.');
    } finally {
      setIsLoading(false);
    }
  };

  const finishQuiz = async (nextResult: QuizResult) => {
    await quizService.recordResult(nextResult);
    setResult(nextResult);
    setView('result');
  };

  const goHome = () => {
    setResult(null);
    setQuestions([]);
    setView('home');
  };

  return (
    <main className="app-shell">
      {view === 'home' && (
        <HomePage isLoading={isLoading} errorMessage={errorMessage} onStartQuiz={startQuiz} />
      )}

      {view === 'quiz' && (
        <QuizPage
          language={language}
          questions={questions}
          onFinish={finishQuiz}
          onQuit={goHome}
        />
      )}

      {view === 'result' && result && (
        <ResultPage result={result} onRestart={() => startQuiz(result.language)} onHome={goHome} />
      )}
    </main>
  );
}

export default App;
