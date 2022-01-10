import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';

export default [
  {
    title: 'Danh sách',
    pages: [
      {
        title: 'Quản lý tài khoản',
        href: '/admin/accounts',
        icon: AssignmentIndIcon
      },
      {
        title: 'Quản lý khóa học',
        href: '/admin/courses',
        icon: ViewComfyIcon
      },
      {
        title: 'Quản lý môn học',
        href: '/admin/subjects',
        icon: VerticalSplitIcon
      }
    ]
  }
];
