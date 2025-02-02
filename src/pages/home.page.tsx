import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Welcome to the Quiz App</h1>
      <div className="w-full md:w-2/3 lg:w-1/2 text-sm text-gray-500 p-4">
        <h3 className="text-lg font-semibold mb-4">Rules to Play the Quiz</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Each question is of <strong>2 Marks</strong>.</li>
          <li>Each question has a <strong>single correct answer</strong>.</li>
          <li>Your score will be displayed at the end of the quiz.</li>
          <li>Once you click <strong>Finish</strong>, you cannot change your answers.</li>
          <li>There is <strong>no time limit</strong>, so take your time to think carefully.</li>
          <li>You can navigate between questions using the <strong>Previous</strong> and <strong>Next</strong> buttons.</li>
          <li>You can review your answers and see the correct answers with explanations after completing the quiz.</li>
        </ul>
      </div>
      <Button onClick={() => navigate("/quiz")} className="w-48">
        Start Quiz
      </Button>
    </div>
  );
};
