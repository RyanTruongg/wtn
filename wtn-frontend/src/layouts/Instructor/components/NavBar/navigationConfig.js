import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import VerticalSplitIcon from "@material-ui/icons/VerticalSplit";

export default [
  {
    title: "Danh sách",
    pages: [
      {
        title: "Khóa học đang dạy",
        href: "/instructor/courses",
        icon: ViewComfyIcon,
      },
      {
        title: "Ngân hàng câu hỏi",
        href: "/instructor/questions",
        icon: VerticalSplitIcon,
      },
    ],
  },
];
