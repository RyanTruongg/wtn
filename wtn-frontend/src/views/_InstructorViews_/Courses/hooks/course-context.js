import { useAuth } from "hooks/use-auth";
import React, { useCallback } from "react";
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

  const auth = useAuth();

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

  const getCourses = useCallback(async () => {
    try {
      const res = await (
        await axios.get("/courses/instructor/" + auth.user.user_id)
      ).data;

      setCourses(res.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [auth.user.user_id]);

  React.useEffect(() => {
    getCourses();
    getInstructors();
  }, [getCourses]);

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
  }, [courses, loading, error, instructors, getCourses]);

  return (
    <coursesContext.Provider value={value}>
      {props.children}
    </coursesContext.Provider>
  );
};
