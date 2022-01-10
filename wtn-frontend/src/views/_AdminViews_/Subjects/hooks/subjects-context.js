import React, { useCallback } from "react";
import axios from "services/axios";

const subjectsContext = React.createContext();

export const useSubjectsContext = () => {
  const context = React.useContext(subjectsContext);
  if (context === undefined) {
    throw new Error("useSubjectContext must be used within a SubjectProvider");
  }
  return context;
};

export const SubjectsProvider = (props) => {
  const [subjects, setSubjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const getSubjects = useCallback(async () => {
    try {
      const res = await (await axios.get(`/subjects`)).data;

      setSubjects(res.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    getSubjects();
  }, [getSubjects]);

  const value = React.useMemo(() => {
    const addSubject = async (subject) => {
      try {
        const res = await (await axios.post(`/subjects`, subject)).data;
        setSubjects([...subjects, res.data]);
        return res;
      } catch (error) {}
    };

    const deleteSubject = async (subject) => {
      try {
        const res = await (await axios.delete(`/subjects/${subject.id}`)).data;
        return res;
      } catch (error) {
        setError(error);
      }
    };

    const updateSubject = async (subject) => {
      try {
        const res = await (await axios.put(`/subjects/${subject.id}`, subject))
          .data;
        getSubjects();
        return res;
      } catch (error) {
        setError(error);
      }
    };

    return {
      subjects,
      loading,
      error,
      deleteSubject,
      updateSubject,
      addSubject,
    };
  }, [error, getSubjects, loading, subjects]);

  return (
    <subjectsContext.Provider value={value}>
      {props.children}
    </subjectsContext.Provider>
  );
};
