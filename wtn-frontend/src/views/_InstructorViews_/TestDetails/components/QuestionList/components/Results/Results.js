import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  CardHeader,
  Divider,
} from "@material-ui/core";
import { useQuestionsInTestContext } from "../../hooks/question-in-test-context";
import { ErrorButton } from "components";
import { useTestsDetailsContext } from "../../../../hooks/test-details-context";

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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { questionInTest, deleteQuestion } = useQuestionsInTestContext();

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  const { testDetails } = useTestsDetailsContext();

  const now = Date.now();
  const ended = Date.parse(testDetails.end_time) < now;
  const started = Date.parse(testDetails.start_time) < now;

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography color="textSecondary" gutterBottom variant="body2">
        Tổng {questionInTest.length} Câu hỏi
      </Typography>
      <Card>
        <CardHeader title="Tất cả câu hỏi" />
        <Divider />

        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nội dung</TableCell>
                    <TableCell>Môn học</TableCell>
                    <TableCell align="right">Tác vụ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questionInTest.slice(0, rowsPerPage).map((question) => (
                    <TableRow hover key={question.id}>
                      <TableCell>
                        <div className={classes.nameCell}>
                          <div>
                            <Typography color="inherit" variant="h6">
                              {question.content}
                            </Typography>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{question.subject_name}</TableCell>

                      <TableCell align="right">
                        <ErrorButton
                          size="small"
                          variant="outlined"
                          onClick={() => deleteQuestion(question.id)}
                          disabled={started || ended}
                        >
                          Xóa
                        </ErrorButton>
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
            count={questionInTest.length}
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
  questionInTest: PropTypes.array.isRequired,
};

Results.defaultProps = {
  questionInTest: [],
};

export default Results;
