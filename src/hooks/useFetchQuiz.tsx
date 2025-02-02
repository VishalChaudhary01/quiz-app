import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchQuiz = () => {
     const [quizData, setQuizData] = useState<any>([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     useEffect(() => {
          const fetchQuiz = async () => {
               try {
                    const response = await axios.get('/api/Uw5CrX');
                    setQuizData(response.data.questions);
               } catch (error: any) {
                    setError(error);
               } finally {
                    setLoading(false);
               }
          }
          fetchQuiz();
     }, []);
  return { quizData, loading, error };
}
