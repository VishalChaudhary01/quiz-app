import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/home.page";
import { QuizPage } from "./pages/quiz.page";

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ <HomePage /> } />
      <Route path="/quiz" element={ <QuizPage /> } />
    </Routes>
    </BrowserRouter>
  );
}
