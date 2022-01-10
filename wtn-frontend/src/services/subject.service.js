import axios from "services/axios";

export default class SubjectServices {
  static getSubjectList = async () => {
    // return axios.get("/subject/");
    return {
      data: [
        { name: "Công nghệ phần mềm", id: 1 },
        { name: "Phát triển hệ thống thông tin doanh nghiệp", id: 2 },
        { name: "Nhập môn trí tuệ nhân tạo", id: 6 },
        { name: "Nhập môn học máy", id: 7 },
        { name: "QUản trị hệ thống thông tin", id: 8 },
      ],
    };
  };
}
