import React from "react";
import axios from "services/axios";

const coursesContext = React.createContext();

export const useCourseContext = () => {
  const context = React.useContext(coursesContext);
  if (context === undefined) {
    throw new Error("useCourseContext must be used within a CourseProvider");
  }
  return context;
};

export const CoursesProvider = (props) => {
  const [courses, setCourses] = React.useState([]);
  const [instructors, setInstructors] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const getInstructors = async () => {
    try {
      const response = await axios.get("/users");
      const filterdInstructors = response.data.data.filter(
        (user) => user.customClaims?.role === "instructor"
      );
      setInstructors(filterdInstructors);
    } catch (error) {
      setError(error);
    }
  };

  const getCourses = async () => {
    try {
      const res = await (await axios.get("/courses")).data;

      setCourses(res.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getCourses();
    getInstructors();
  }, []);

  const value = React.useMemo(() => {
    const addCourse = async (course) => {
      try {
        const res = await (await axios.post("/courses", course)).data;
        getCourses();
        return res;
      } catch (error) {
        setError(error);
      }
    };

    return {
      courses,
      loading,
      error,
      addCourse,
      instructors,
    };
  }, [courses, loading, error, instructors]);

  return (
    <coursesContext.Provider value={value}>
      {props.children}
    </coursesContext.Provider>
  );
};
