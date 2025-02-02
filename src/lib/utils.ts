import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getColor = ({ selectedAns, correctAns }: { selectedAns?: string; correctAns: string; }) => {
  if (!selectedAns) return "bg-purple-500";
  return selectedAns === correctAns
    ? "bg-green-500"
    : "bg-red-500";
};

export const calculateScore = (answerList: IAnswer[]) => {
  return answerList.filter((ans) => ans.selectedAns === ans.correctAns).length;
};

export function formatExplanation(explanation: string) {
  return explanation
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Convert **bold** to <strong>
    .replace(/\n/g, "<br>") // Replace new lines with <br>
    .replace(/(\d+)\.\s/g, "<li>") // Convert numbered lists to <li>
    .replace(/<li>/g, "<li>") // Ensure each <li> starts correctly
    .replace(/<br><li>/g, "<ol><li>") // Start <ol> before the first <li>
    .replace(/<\/li><br>/g, "</li>") // Ensure proper <li> closing
    .replace(/<\/li><br><li>/g, "</li><li>") // Fix list formatting
    .replace(/<\/li><br>/g, "</li></ol>"); // Close <ol> at the end
}
