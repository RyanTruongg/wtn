import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  LinearProgress,
} from "@material-ui/core";

import { GenericMoreButton } from "components";
import { TableEditBar } from "./components";
import usePaginate from "hooks/use-paginate";
import useTableSelect from "hooks/use-table-select";

const useStyles = makeStyles(theme => ({
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
    marginRight: theme.spacing(1),
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: "flex-end",
  },
}));

const Results = props => {
  const { className, questions, reviewQuestion, ...rest } = props;

  const classes = useStyles();

  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePaginate();

  const { selectedEntities, handleSelectAll, handleSelectOne } = useTableSelect(
    questions
  );

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography color="textSecondary" gutterBottom variant="body2">
        {questions.length} Records found. Page {page + 1} of{" "}
        {Math.ceil(questions.length / rowsPerPage)}
      </Typography>
      <Card>
        <CardHeader action={<GenericMoreButton />} title="All Questions" />
        <Divider />

        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedEntities.length === questions.length}
                        color="primary"
                        indeterminate={
                          selectedEntities.length > 0 &&
                          selectedEntities.length < questions.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Content</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questions.slice(0, rowsPerPage).map(question => (
                    <TableRow
                      hover
                      key={question.id}
                      selected={selectedEntities.indexOf(question.id) !== -1}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedEntities.indexOf(question.id) !== -1}
                          color="primary"
                          onChange={event =>
                            handleSelectOne(event, question.id)
                          }
                          value={selectedEntities.indexOf(question.id) !== -1}
                        />
                      </TableCell>
                      <TableCell>
                        <div className={classes.nameCell}>
                          <div>
                            <Typography color="inherit" variant="h5">
                              {question.content}
                            </Typography>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{question.type}</TableCell>
                      <TableCell>{question.subject}</TableCell>

                      <TableCell align="right">
                        <Button
                          onClick={reviewQuestion(question.id)}
                          color="primary"
                          size="small"
                          variant="outlined">
                          View
                        </Button>
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
            count={questions.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <TableEditBar selected={selectedEntities} />
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  questions: PropTypes.array.isRequired,
};

Results.defaultProps = {
  questions: [],
};

export default Results;
