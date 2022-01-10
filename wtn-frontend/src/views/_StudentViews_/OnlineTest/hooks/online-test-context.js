import { useAuth } from "hooks/use-auth";
import React, { useCallback } from "react";
import axios from "services/axios";
const testDetailsContext = React.createContext();

export const useTestDetailsContext = () => {
  const context = React.useContext(testDetailsContext);
  if (context === undefined) {
    throw new Error(
      "useTestDetailsContext must be used within a TestDetailsProvider"
    );
  }
  return context;
};

export const TestDetailsProvider = (props) => {
  const { testId } = props;
  const [testDetails, setTestDetails] = React.useState([]);
  const [attempt, setAttempt] = React.useState(null);
  const [questions, setQuestions] = React.useState([]);
  const [result, setResult] = React.useState(null);

  const auth = useAuth();

  const getTestDetails = useCallback(async () => {
    try {
      const res = await (await axios.get(`/exams/${testId}`)).data;

      setTestDetails(res.data);
    } catch (error) {}
  }, [testId]);

  const getAttempt = useCallback(async () => {
    try {
      const res = await (
        await axios.get(`/exams/attempt/${testId}/${auth.user.user_id}`)
      ).data;

      setAttempt(res.data);
    } catch (error) {}
  }, [auth.user.user_id, testId]);

  const getQuestions = useCallback(async () => {
    try {
      const res = await (await axios.get(`/exam-questions/exam/${testId}`))
        .data;

      setQuestions(res.data);
    } catch (error) {}
  }, [testId]);

  const getResults = useCallback(async () => {
    try {
      const res = await (await axios.get(`/exam-answers/result/${attempt.id}`))
        .data;

      setResult(res.data);
    } catch (error) {}
  }, [attempt]);

  React.useEffect(() => {
    getTestDetails();
    getAttempt();
    getQuestions();
  }, [getAttempt, getQuestions, getTestDetails]);

  React.useEffect(() => {
    if (attempt?.id) {
      getResults();
    }
  }, [attempt, getResults]);

  React.useEffect(() => {
    console.log(result);
  }, [result]);

  const value = React.useMemo(() => {
    const createAttempt = async () => {
      try {
        const res = await (
          await axios.post(`/exams/attempt`, {
            exam_id: testId,
            user_id: auth.user.user_id,
          })
        ).data;

        setAttempt(res.data);
      } catch (error) {}
    };

    const submitAttempt = async (answers) => {
      try {
        await (
          await axios.post(`/exam-answers/submit`, {
            attempt_id: attempt.id,
            answers,
          })
        ).data;

        getAttempt();
      } catch (error) {}
    };

    return {
      result,
      questions,
      attempt,
      testDetails,
      createAttempt,
      submitAttempt,
    };
  }, [
    attempt,
    auth.user.user_id,
    getAttempt,
    questions,
    result,
    testDetails,
    testId,
  ]);

  return (
    <testDetailsContext.Provider value={value}>
      {props.children}
    </testDetailsContext.Provider>
  );
};
