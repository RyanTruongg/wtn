import React, { useCallback } from "react";
import axios from "services/axios";
import { useTestsDetailsContext } from "views/_InstructorViews_/TestDetails/hooks/test-details-context";

const questionInTestContext = React.createContext();

export const useQuestionsInTestContext = () => {
  const context = React.useContext(questionInTestContext);
  if (context === undefined) {
    throw new Error(
      "useQuestionsInTestContext must be used within a QuestionProvider"
    );
  }
  return context;
};

export const QuestionsInTestProvider = (props) => {
  const [questionInTest, setQuestionsInTest] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const { testId } = useTestsDetailsContext();

  const getQuestionsInTest = useCallback(async () => {
    try {
      const res = await (await axios.get("/exam-questions/exam/" + testId))
        .data;

      setQuestionsInTest(res.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [testId]);

  React.useEffect(() => {
    getQuestionsInTest();
  }, [getQuestionsInTest]);

  const value = React.useMemo(() => {
    const addQuestion = async (question) => {
      try {
        const res = await (
          await axios.post("/questions/exam/" + testId, question)
        ).data;
        getQuestionsInTest();
        return res;
      } catch (error) {
        setError(error);
      }
    };

    const updateQuestion = async (question) => {
      try {
        const res = await (
          await axios.put(`/questionInTest/${question.id}`, question)
        ).data;
        getQuestionsInTest();
        return res;
      } catch (error) {
        setError(error);
      }
    };

    const deleteQuestion = async (question_id) => {
      try {
        const res = await (
          await axios.delete(`/exam-questions/${testId}/${question_id}`)
        ).data;
        getQuestionsInTest();
        return res;
      } catch (error) {
        setError(error);
      }
    };

    return {
      questionInTest,
      loading,
      error,
      addQuestion,
      updateQuestion,
      deleteQuestion,
    };
  }, [questionInTest, loading, error, testId, getQuestionsInTest]);

  return (
    <questionInTestContext.Provider value={value}>
      {props.children}
    </questionInTestContext.Provider>
  );
};
