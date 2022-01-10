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
} from "@material-ui/core";

import { GenericMoreButton, ErrorButton } from "components";
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
  const { className, subjects = [], handleDeleteOne, ...rest } = props;

  const classes = useStyles();

  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePaginate();

  const { selectedEntities, handleSelectAll, handleSelectOne } = useTableSelect(
    subjects
  );

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography color="textSecondary" gutterBottom variant="body2">
        {subjects.length} Records found. Page {page + 1} of{" "}
        {Math.ceil(subjects.length / rowsPerPage)}
      </Typography>
      <Card>
        <CardHeader action={<GenericMoreButton />} title="All subjects" />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedEntities.length === subjects.length}
                        color="primary"
                        indeterminate={
                          selectedEntities.length > 0 &&
                          selectedEntities.length < subjects.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subjects.slice(0, rowsPerPage).map(subject => (
                    <TableRow
                      hover
                      key={subject.id}
                      selected={selectedEntities.indexOf(subject.id) !== -1}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedEntities.indexOf(subject.id) !== -1}
                          color="primary"
                          onChange={event => handleSelectOne(event, subject.id)}
                          value={selectedEntities.indexOf(subject.id) !== -1}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{subject.id}</Typography>
                      </TableCell>
                      <TableCell>{subject.name}</TableCell>
                      <TableCell align="right">
                        <ErrorButton
                          onClick={handleDeleteOne(subject.id)}
                          size="small"
                          variant="outlined">
                          Delete
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
            count={subjects.length}
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
  subjects: PropTypes.array.isRequired,
};

Results.defaultProps = {
  subjects: [],
};

export default Results;
