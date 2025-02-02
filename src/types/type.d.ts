declare interface IAnswer {
  index: number;
  question: string;
  selectedAns?: string;
  correctAns: string;
  explanation?: string;
}

declare interface ICurrentQueAns {
  index: number;
  questionId: string;
  answerId?: string;
}
