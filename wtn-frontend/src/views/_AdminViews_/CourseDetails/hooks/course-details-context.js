import React, { useCallback } from "react";
import axios from "services/axios";
import { useHistory } from "react-router-dom";
const courseDetailsContext = React.createContext();

export const useCourseDetailsContext = () => {
  const context = React.useContext(courseDetailsContext);
  if (context === undefined) {
    throw new Error(
      "useCourseDetailsContext must be used within a CourseDetailsProvider"
    );
  }
  return context;
};

export const CourseDetailsProvider = (props) => {
  const { courseId } = props;
  const [courseDetails, setCourseDetails] = React.useState([]);
  const [courseInstructors, setCourseInstructors] = React.useState(null);
  const history = useHistory();

  const getCourseDetails = useCallback(async () => {
    try {
      const res = await (await axios.get(`/courses/${courseId}`)).data;

      setCourseDetails(res.data);
    } catch (error) {}
  }, [courseId]);

  const getCourseInstructors = useCallback(async () => {
    try {
      const res = await (await axios.get(`/courses/${courseId}/instructor`))
        .data;
      setCourseInstructors(res.data);
    } catch (error) {}
  }, [courseId]);

  React.useEffect(() => {
    getCourseDetails();
    getCourseInstructors();
  }, [getCourseDetails, getCourseInstructors]);

  const value = React.useMemo(() => {
    const deleteCourse = async () => {
      try {
        const res = await (await axios.delete(`/courses/${courseDetails.id}`))
          .data;
        history.push("/admin/courses");
        return res;
      } catch (error) {}
    };

    const updateCourse = async (course) => {
      try {
        const res = await (
          await axios.put(`/courses/${courseDetails.id}`, course)
        ).data;
        getCourseDetails();
        return res;
      } catch (error) {}
    };

    return {
      courseDetails,
      deleteCourse,
      updateCourse,
      courseInstructors,
    };
  }, [courseDetails, courseInstructors, getCourseDetails, history]);

  return (
    <courseDetailsContext.Provider value={value}>
      {props.children}
    </courseDetailsContext.Provider>
  );
};
