import { useState } from "react";
import { useFetchQuiz } from "../hooks/useFetchQuiz";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ShowResult } from "@/components/custome/showResult";

export const QuizPage = () => {
  const { quizData, loading, error } = useFetchQuiz();
  const [showResults, setShowResults] = useState(false);
  const [currentQueAns, setCurrentQueAns] = useState<ICurrentQueAns>({
    index: 0,
    questionId: quizData?.[0]?.id,
  });
  const [answerList, setAnswerList] = useState<IAnswer[]>([]);

  const handleSubmitAns = () => {
    const currentQuizQuestion = quizData[currentQueAns.index];
    const selectedOption = currentQuizQuestion.options.find(
      (opt: { id: string }) => opt.id === currentQueAns.answerId
    );
    const correctOption = currentQuizQuestion.options.find(
      (opt: { is_correct: boolean }) => opt.is_correct
    );
    setAnswerList((prev) => [
      ...prev,
      {
        index: currentQueAns.index,
        question: currentQuizQuestion.description,
        selectedAns: selectedOption?.description,
        correctAns: correctOption?.description,
        explanation: currentQuizQuestion.detailed_solution,
      },
    ]);

    if (currentQueAns.index < quizData.length - 1) {
      setCurrentQueAns((prev) => ({
        ...prev,
        index: prev.index + 1,
        questionId: quizData[prev.index + 1].id,
        answerId: undefined,
      }));
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    return <ShowResult answerList={answerList} quizData={quizData} />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500">
          Error loading quiz data. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
    <Card className="relative w-full md:w-2/3 lg:w-1/2 min-h-[380px]">
      <CardHeader>
        <CardTitle>
          Question {currentQueAns.index + 1} / {quizData?.length}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-base font-medium text-foreground">
          {quizData[currentQueAns.index]?.description}
        </p>
        <RadioGroup
          value={currentQueAns?.answerId ?? ""}
          onValueChange={(value) =>
            setCurrentQueAns((prev) => ({ ...prev, answerId: value }))
          }
          className="flex flex-col items-start gap-4"
        >
          {quizData[currentQueAns.index].options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem value={option.id} id={option.id} />
              <Label htmlFor={option.id}>{option.description}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
      <div className="absolute bottom-6 right-6 flex items-center gap-4">
          <Button
            disabled={currentQueAns.index === 0}
            onClick={() =>
              setCurrentQueAns((prev) => ({
                ...prev,
                index: prev.index - 1,
                questionId: quizData[prev.index - 1].id,
              }))
            }
          >
            Previous
          </Button>
          <Button onClick={handleSubmitAns}>
            {currentQueAns.index === quizData.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </CardFooter>
    </Card>
    </div>
  );
};
