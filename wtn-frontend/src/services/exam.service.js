import axios from "services/axios";

export default class ExamServices {
  static getExamList = async (skip = 0, limit = 10) => {
    // return axios.get("/exam/", {
    //   params: {
    //     skip,
    //     limit,
    //   },
    // });
    return {
      data: [
        {
          name: "Giữa kỳ công nghệ phần mềm",
          start_time: "2021-09-14T08:30:00.0",
          end_time: "2021-09-15T08:30:00.0",
          id: 1,
        },
        {
          name: "Cuối kỳ nhập môn trí tuệ nhân tạo",
          start_time: "2021-09-14T00:00:00.0",
          end_time: "2021-12-14T00:00:00.0",
          id: 2,
        },
        {
          name: "Cuối kỳ bla bla",
          start_time: "2021-12-14T00:00:00.0",
          end_time: "2021-12-14T00:00:00.0",
          id: 3,
        },
      ],
    };
  };
}
