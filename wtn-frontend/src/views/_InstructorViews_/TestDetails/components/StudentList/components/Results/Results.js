import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";

import usePaginate from "hooks/use-paginate";
import { useTestsDetailsContext } from "views/_InstructorViews_/TestDetails/hooks/test-details-context";
const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 700,
  },
  nameCell: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(2),
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: "flex-end",
  },
}));

const Results = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const { testResult } = useTestsDetailsContext();

  console.log(testResult);

  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePaginate();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography color="textSecondary" gutterBottom variant="body2">
        Tổng {testResult?.result?.length} học sinh.
      </Typography>
      <Card>
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên học sinh & email</TableCell>
                    <TableCell align="right">Điểm số</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {testResult?.result?.map((student) => (
                    <TableRow hover key={student.id}>
                      <TableCell>
                        <div className={classes.nameCell}>
                          <Avatar
                            src={student.photoURL}
                            className={classes.avatar}
                          ></Avatar>
                          <div>
                            <Typography variant="h6">
                              {student.displayName}
                            </Typography>
                            <div>{student.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="h4">
                          {student.count}/{testResult.totalQuestion}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={testResult?.result?.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  studentInCourses: PropTypes.array.isRequired,
};

Results.defaultProps = {
  studentInCourses: [],
};

export default Results;
