import axios from "services/axios";

export default class CourseServices {
  static getCourseList = async (skip = 0, limit = 5) => {
    // return axios.get("/course/", {
    //   params: {
    //     skip,
    //     limit,
    //   },
    // });

    return {
      data: [
        { name: "CS 19050301", id: 1 },
        { name: "CS 19050302", id: 2 },
        { name: "CS 19050303", id: 3 },
      ],
    };
  };
  static addCourse = (name) => {
    return axios.post("/course/", { name });
  };
}
