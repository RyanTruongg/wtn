import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";

import { TableEditBar } from "components";

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
    marginRight: theme.spacing(2),
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: "flex-end",
  },
}));

const Results = props => {
  const { className, questions = [], ...rest } = props;

  const classes = useStyles();

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSelectAll = event => {
    const selectedStudents = event.target.checked
      ? questions.map(question => question.id)
      : [];

    setSelectedStudents(selectedStudents);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedStudents.indexOf(id);
    let newSelectedStudents = [];

    if (selectedIndex === -1) {
      newSelectedStudents = newSelectedStudents.concat(selectedStudents, id);
    } else if (selectedIndex === 0) {
      newSelectedStudents = newSelectedStudents.concat(
        selectedStudents.slice(1)
      );
    } else if (selectedIndex === selectedStudents.length - 1) {
      newSelectedStudents = newSelectedStudents.concat(
        selectedStudents.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedStudents = newSelectedStudents.concat(
        selectedStudents.slice(0, selectedIndex),
        selectedStudents.slice(selectedIndex + 1)
      );
    }

    setSelectedStudents(newSelectedStudents);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography color="textSecondary" gutterBottom variant="body2">
        {questions.length} Records found. Page {page + 1} of{" "}
        {Math.ceil(questions.length / rowsPerPage)}
      </Typography>
      <Card>
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedStudents.length === questions.length}
                        color="primary"
                        indeterminate={
                          selectedStudents.length > 0 &&
                          selectedStudents.length < questions.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Title</TableCell>
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
                      selected={selectedStudents.indexOf(question.id) !== -1}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedStudents.indexOf(question.id) !== -1}
                          color="primary"
                          onChange={event =>
                            handleSelectOne(event, question.id)
                          }
                          value={selectedStudents.indexOf(question.id) !== -1}
                        />
                      </TableCell>
                      <TableCell>
                        <div className={classes.nameCell}>
                          <div>
                            <Typography color="inherit" variant="h5">
                              {question.title}
                            </Typography>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{question.type}</TableCell>
                      <TableCell>{question.subject}</TableCell>

                      <TableCell align="right">
                        <Button color="primary" size="small" variant="outlined">
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
      <TableEditBar selected={selectedStudents} />
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
