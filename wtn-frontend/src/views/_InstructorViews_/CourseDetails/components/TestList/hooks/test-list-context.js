import React from "react";
import axios from "services/axios";

const testContext = React.createContext();

export const useTestContext = () => {
  const context = React.useContext(testContext);
  if (context === undefined) {
    throw new Error("useTestContext must be used within a TestProvider");
  }
  return context;
};

export const TestsProvider = (props) => {
  const [tests, setTests] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const getTests = async () => {
    try {
      const res = await (await axios.get("/exams")).data;

      setTests(res.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getTests();
  }, []);

  const value = React.useMemo(() => {
    const addTest = async (test) => {
      try {
        const res = await (await axios.post("/exams", test)).data;
        getTests();
        return res;
      } catch (error) {
        setError(error);
      }
    };

    return {
      tests,
      loading,
      error,
      addTest,
    };
  }, [tests, loading, error]);

  return (
    <testContext.Provider value={value}>{props.children}</testContext.Provider>
  );
};
