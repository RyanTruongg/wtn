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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";

import { GenericMoreButton, TestCells } from "components";
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
  const { className, tests, ...rest } = props;

  const classes = useStyles();

  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePaginate();

  const { selectedEntities, handleSelectAll, handleSelectOne } = useTableSelect(
    tests
  );

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography color="textSecondary" gutterBottom variant="body2">
        {tests.length} Records found. Page {page + 1} of{" "}
        {Math.ceil(tests.length / rowsPerPage)}
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
                        checked={selectedEntities.length === tests.length}
                        color="primary"
                        indeterminate={
                          selectedEntities.length > 0 &&
                          selectedEntities.length < tests.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Start</TableCell>
                    <TableCell>End</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tests.slice(0, rowsPerPage).map(test => (
                    <TableRow
                      hover
                      key={test.id}
                      selected={selectedEntities.indexOf(test.id) !== -1}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedEntities.indexOf(test.id) !== -1}
                          color="primary"
                          onChange={event => handleSelectOne(event, test.id)}
                          value={selectedEntities.indexOf(test.id) !== -1}
                        />
                      </TableCell>
                      <TestCells test={test} />
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
            count={tests.length}
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
  tests: PropTypes.array.isRequired,
};

Results.defaultProps = {
  tests: [],
};

export default Results;
