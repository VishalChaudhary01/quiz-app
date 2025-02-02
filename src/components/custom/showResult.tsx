import { calculateScore, formatExplanation, getColor } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";

export const ShowResult = ({ answerList, quizData }: { answerList: IAnswer[]; quizData: any; }) => {
  const [selectedAns, setSelectedAns] = useState<IAnswer | null>(null);

  const handleOpenDialog = (id: number) => {
    const ansDetails = answerList.find((ans) => id === ans.index);
    if (!ansDetails) return;
    setSelectedAns({
      index: id,
      question: ansDetails.question,
      selectedAns: ansDetails.selectedAns ?? "",
      correctAns: ansDetails.correctAns,
      explanation: ansDetails.explanation,
    });
  };

  const showResultMessage = (score: number) => {
    if (score <= 3) return "You need to improve your knowledge";
    if (score <= 6 && score >= 4) return "You are doing good but not great";
    if (score <= 9 && score >= 7) return "You are doing great";
    if (score === 10) return "You are a genious";
    return "You need to improve your knowledge";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
    <Card className="w-full md:w-2/3 lg:w-1/2 min-h-[380px] container mx-auto mt-12">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl lg:text-3xl font-bold text-center">Your Quiz Result</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          Your Score: {calculateScore(answerList) * 2} / {quizData.length * 2}
          <span className="text-sm text-gray-500">{showResultMessage(calculateScore(answerList))}</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {answerList?.map((ans, index) => {
            return (
              <Button
                key={index}
                variant="outline"
                className={`rounded-full w-12 h-12 text-center text-white ${getColor({
                  selectedAns: ans.selectedAns,
                  correctAns: ans.correctAns,
                })}`}
                onClick={() => handleOpenDialog(index)}
              >
                {index + 1}
              </Button>
            );
          })}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start mt-4 justify-center">
        <h3 className="text-lg font-semibold">Color Key:</h3>
        <ul className="flex flex-col gap-2 text-sm">
          <li className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span>Correct Answer</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span>Wrong Answer</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
            <span>Not Answered</span>
          </li>
        </ul>
        <span className="text-sm text-gray-500 mt-4">You can click on question number to show the details solution</span>
      </CardFooter>

      {/* Question Details Popup */}
      {selectedAns && (
        <Dialog open={!!selectedAns} onOpenChange={() => setSelectedAns(null)}>
          <DialogContent className="overflow-y-scroll max-h-[500px]">
            <DialogHeader>
              <DialogTitle>Question Details</DialogTitle>
            </DialogHeader>
            <p className="text-base font-medium">{selectedAns.question}</p>
            <p className="text-sm text-gray-600">
              <strong>Selected Answer:</strong>{" "}
              {selectedAns.selectedAns ?? "Not answered"}
            </p>
            <p className="text-sm text-green-600">
              <strong>Correct Answer:</strong> {selectedAns.correctAns}
            </p>
            {selectedAns.explanation && (
              <p
                className="text-sm text-gray-500"
                dangerouslySetInnerHTML={{
                  __html: formatExplanation(selectedAns.explanation),
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </Card>
    </div>
  );
};
