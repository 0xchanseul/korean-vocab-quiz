import { useState } from 'react';
import { AddWordPage } from './pages/AddWordPage';
import { CustomQuizIntroPage } from './pages/CustomQuizIntroPage';
import { CustomQuizPage } from './pages/CustomQuizPage';
import { CustomQuizResultPage } from './pages/CustomQuizResultPage';
import { HomePage } from './pages/HomePage';
import { QuizPage } from './pages/QuizPage';
import { ResultPage } from './pages/ResultPage';
import { quizService } from './services/QuizService';
import type {
  CustomQuizDirection,
  CustomQuizQuestion,
  QuizLanguage,
  QuizQuestion,
  QuizResult
} from './types/quiz';

type AppView = 'home' | 'quiz' | 'result' | 'add-word' | 'custom-intro' | 'custom-quiz' | 'custom-result';

function App() {
  const [view, setView] = useState<AppView>('home');
  const [language, setLanguage] = useState<QuizLanguage>('korean');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [customDirection, setCustomDirection] = useState<CustomQuizDirection>('learnKorean');
  const [customQuestions, setCustomQuestions] = useState<CustomQuizQuestion[]>([]);
  const [customScore, setCustomScore] = useState(0);
  const [customTotal, setCustomTotal] = useState(0);
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

  const startCustomQuiz = async (direction: CustomQuizDirection) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const nextQuestions = await quizService.createCustomQuizSet(direction);
      setCustomDirection(direction);
      setCustomQuestions(nextQuestions);
      setView(nextQuestions.length > 0 ? 'custom-quiz' : 'custom-intro');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '커스텀 퀴즈를 준비하지 못했어요.');
      setView('home');
    } finally {
      setIsLoading(false);
    }
  };

  const finishQuiz = async (nextResult: QuizResult) => {
    await quizService.recordResult(nextResult);
    setResult(nextResult);
    setView('result');
  };

  const finishCustomQuiz = (score: number, total: number) => {
    setCustomScore(score);
    setCustomTotal(total);
    setView('custom-result');
  };

  const goHome = () => {
    setResult(null);
    setQuestions([]);
    setCustomQuestions([]);
    setView('home');
  };

  return (
    <main className="app-shell">
      {view === 'home' && (
        <HomePage
          isLoading={isLoading}
          errorMessage={errorMessage}
          onStartQuiz={startQuiz}
          onStartCustomQuiz={() => setView('custom-intro')}
          onAddWord={() => setView('add-word')}
        />
      )}

      {view === 'add-word' && <AddWordPage onBack={goHome} />}

      {view === 'custom-intro' && (
        <CustomQuizIntroPage
          onBack={goHome}
          onAddWord={() => setView('add-word')}
          onStart={startCustomQuiz}
        />
      )}

      {view === 'quiz' && (
        <QuizPage
          language={language}
          questions={questions}
          onFinish={finishQuiz}
          onQuit={goHome}
        />
      )}

      {view === 'custom-quiz' && (
        <CustomQuizPage
          direction={customDirection}
          questions={customQuestions}
          onFinish={finishCustomQuiz}
          onQuit={goHome}
        />
      )}

      {view === 'result' && result && (
        <ResultPage result={result} onRestart={() => startQuiz(result.language)} onHome={goHome} />
      )}

      {view === 'custom-result' && (
        <CustomQuizResultPage
          score={customScore}
          total={customTotal}
          onRestart={() => startCustomQuiz(customDirection)}
          onHome={goHome}
        />
      )}
    </main>
  );
}

export default App;
