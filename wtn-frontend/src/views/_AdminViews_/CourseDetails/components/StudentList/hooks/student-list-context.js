import React, { useCallback } from "react";
import axios from "services/axios";
import { useCourseDetailsContext } from "views/_AdminViews_/CourseDetails/hooks/course-details-context";

const studentInCourseContext = React.createContext();

export const useStudentInCourseContext = () => {
  const context = React.useContext(studentInCourseContext);
  if (context === undefined) {
    throw new Error(
      "useStudentInCourseContext must be used within a StudentInCourseProvider"
    );
  }
  return context;
};

export const StudentInCoursesProvider = (props) => {
  const [studentInCourses, setStudentInCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const { courseDetails } = useCourseDetailsContext();

  const getStudentInCourses = useCallback(async () => {
    try {
      const res = await (
        await axios.get("/user-courses/course/" + courseDetails.id)
      ).data;

      setStudentInCourses(res.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [courseDetails]);

  React.useEffect(() => {
    if (courseDetails) {
      getStudentInCourses();
    }
  }, [courseDetails, getStudentInCourses]);

  const value = React.useMemo(() => {
    const addStudentInCourse = async (email) => {
      try {
        const res = await (
          await axios.post("/user-courses", {
            course_id: courseDetails.id,
            email,
          })
        ).data;
        getStudentInCourses();
        return res;
      } catch (error) {
        setError(error);
      }
    };

    const deleteStudentInCourse = async (student_id) => {
      try {
        await axios.delete(`/user-courses/${student_id}/${courseDetails.id}`);
        getStudentInCourses();
      } catch (error) {
        setError(error);
      }
    };

    return {
      studentInCourses,
      loading,
      error,
      addStudentInCourse,
      deleteStudentInCourse,
    };
  }, [studentInCourses, loading, error, getStudentInCourses, courseDetails.id]);

  return (
    <studentInCourseContext.Provider value={value}>
      {props.children}
    </studentInCourseContext.Provider>
  );
};
