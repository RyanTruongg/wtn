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
  CardHeader,
  Checkbox,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

import { ErrorButton, GenericMoreButton } from "components";
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
    marginRight: theme.spacing(2),
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: "flex-end",
  },
}));

const Results = props => {
  const { className, students, handleDeleteOne, ...rest } = props;

  const classes = useStyles();

  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePaginate();

  const { selectedEntities, handleSelectAll, handleSelectOne } = useTableSelect(
    students
  );

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography color="textSecondary" gutterBottom variant="body2">
        {students.length} Records found. Page {page + 1} of{" "}
        {Math.ceil(students.length / rowsPerPage)}
      </Typography>
      <Card>
        <CardHeader action={<GenericMoreButton />} title="All people" />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedEntities.length === students.length}
                        color="primary"
                        indeterminate={
                          selectedEntities.length > 0 &&
                          selectedEntities.length < students.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.slice(0, rowsPerPage).map(student => (
                    <TableRow
                      hover
                      key={student.id}
                      selected={selectedEntities.indexOf(student.id) !== -1}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedEntities.indexOf(student.id) !== -1}
                          color="primary"
                          onChange={event => handleSelectOne(event, student.id)}
                          value={selectedEntities.indexOf(student.id) !== -1}
                        />
                      </TableCell>
                      <TableCell>
                        <div className={classes.nameCell}>
                          <Avatar className={classes.avatar}>
                            <PersonIcon />
                          </Avatar>
                          <div>
                            <Typography variant="h6">{student.name}</Typography>
                            <div>{student.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <ErrorButton
                          onClick={handleDeleteOne(student.id)}
                          size="small"
                          variant="outlined">
                          Remove
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
            count={students.length}
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
  students: PropTypes.array.isRequired,
};

Results.defaultProps = {
  students: [],
};

export default Results;
