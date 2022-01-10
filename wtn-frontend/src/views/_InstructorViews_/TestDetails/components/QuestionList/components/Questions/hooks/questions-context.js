import React from "react";
import axios from "services/axios";

const questionsContext = React.createContext();

export const useQuestionsContext = () => {
  const context = React.useContext(questionsContext);
  if (context === undefined) {
    throw new Error(
      "useQuestionsContext must be used within a QuestionProvider"
    );
  }
  return context;
};

export const QuestionsProvider = (props) => {
  const [questions, setQuestions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const getQuestions = async () => {
    try {
      const res = await (await axios.get("/questions")).data;

      setQuestions(res.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getQuestions();
  }, []);

  const value = React.useMemo(() => {
    const addQuestion = async (question) => {
      try {
        const res = await (await axios.post("/questions", question)).data;
        getQuestions();
        return res;
      } catch (error) {
        setError(error);
      }
    };

    const updateQuestion = async (question) => {
      try {
        const res = await (
          await axios.put(`/questions/${question.id}`, question)
        ).data;
        getQuestions();
        return res;
      } catch (error) {
        setError(error);
      }
    };

    const deleteQuestion = async (id) => {
      try {
        const res = await (await axios.delete(`/questions/${id}`)).data;
        getQuestions();
        return res;
      } catch (error) {
        setError(error);
      }
    };

    return {
      questions,
      loading,
      error,
      addQuestion,
      updateQuestion,
      deleteQuestion,
    };
  }, [questions, loading, error]);

  return (
    <questionsContext.Provider value={value}>
      {props.children}
    </questionsContext.Provider>
  );
};
