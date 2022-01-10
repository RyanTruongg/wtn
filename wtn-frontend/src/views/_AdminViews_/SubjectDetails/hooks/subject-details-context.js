import React, { useCallback } from "react";
import axios from "services/axios";
import { useHistory } from "react-router-dom";

const subjectDetailsContext = React.createContext();

export const useSubjectDetailsContext = () => {
  const context = React.useContext(subjectDetailsContext);
  if (context === undefined) {
    throw new Error(
      "useSubjectDetailsContext must be used within a SubjectDetailsProvider"
    );
  }
  return context;
};

export const SubjectDetailsProvider = (props) => {
  const { subjectId } = props;
  const [subjectDetails, setSubjectDetails] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const history = useHistory();

  const fetchSubjectDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/subjects/${subjectId}`);
      setSubjectDetails(response.data.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  }, [subjectId]);

  React.useEffect(() => {
    fetchSubjectDetails();
  }, [fetchSubjectDetails]);

  const value = React.useMemo(() => {
    const updateSubject = async (subject) => {
      const res = await axios.put(`/subjects/${subjectId}`, subject);
      setSubjectDetails(res.data.data);
      return res;
    };

    const deleteSubject = async () => {
      await axios.delete(`/subjects/${subjectId}`);
      history.push("/admin/subjects");
    };

    return {
      subjectDetails,
      loading,
      error,
      updateSubject,
      deleteSubject,
    };
  }, [subjectDetails, loading, error, subjectId, history]);

  return (
    <subjectDetailsContext.Provider value={value}>
      {props.children}
    </subjectDetailsContext.Provider>
  );
};
