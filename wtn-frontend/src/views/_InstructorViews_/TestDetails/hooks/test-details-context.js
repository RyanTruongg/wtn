import React, { useCallback } from "react";
import axios from "services/axios";
import { useHistory } from "react-router-dom";
const testDetailsContext = React.createContext();

export const useTestsDetailsContext = () => {
  const context = React.useContext(testDetailsContext);
  if (context === undefined) {
    throw new Error(
      "useTestsDetailsContext must be used within a TestsDetailsProvider"
    );
  }
  return context;
};

export const TestsDetailsProvider = (props) => {
  const { testId } = props;
  const [testDetails, setTestsDetails] = React.useState([]);
  const [testResult, setTestResult] = React.useState([]);
  const history = useHistory();

  const getTestsDetails = useCallback(async () => {
    try {
      const res = await (await axios.get(`/exams/${testId}`)).data;

      setTestsDetails(res.data);
    } catch (error) {}
  }, [testId]);

  const getTestResult = useCallback(async () => {
    try {
      const res = await (await axios.get(`/exams/result/${testId}`)).data;

      setTestResult(res.data);
    } catch (error) {}
  }, [testId]);

  React.useEffect(() => {
    getTestsDetails();
    getTestResult();
  }, [getTestResult, getTestsDetails]);

  const value = React.useMemo(() => {
    const updateTest = async (data) => {
      try {
        await axios.put(`/exams/${testId}`, data);
        getTestsDetails();
      } catch (error) {}
    };

    const deleteTest = async (id) => {
      try {
        await axios.delete(`/exams/${testId}`);
        history.push("/instructor/courses");
      } catch (error) {}
    };

    return {
      testResult,
      testId,
      testDetails,
      updateTest,
      deleteTest,
    };
  }, [getTestsDetails, history, testDetails, testId, testResult]);

  return (
    <testDetailsContext.Provider value={value}>
      {props.children}
    </testDetailsContext.Provider>
  );
};
