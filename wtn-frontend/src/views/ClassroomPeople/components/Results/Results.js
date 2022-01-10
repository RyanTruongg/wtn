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
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";

import PersonIcon from "@material-ui/icons/Person";

import { GenericMoreButton, ErrorButton, Skeleton } from "components";
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
  const { className, users, handleDeleteOne, ...rest } = props;

  const classes = useStyles();

  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePaginate();

  const { selectedEntities, handleSelectAll, handleSelectOne } = useTableSelect(
    users
  );

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography color="textSecondary" gutterBottom variant="body2">
        {users.length} Records found. Page {page + 1} of{" "}
        {Math.ceil(users.length / rowsPerPage)}
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
                        checked={selectedEntities.length === users.length}
                        color="primary"
                        indeterminate={
                          selectedEntities.length > 0 &&
                          selectedEntities.length < users.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Full Name</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.length > 0 ? (
                    users.slice(0, rowsPerPage).map(user => (
                      <TableRow
                        hover
                        key={user.id}
                        selected={selectedEntities.indexOf(user.id) !== -1}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedEntities.indexOf(user.id) !== -1}
                            color="primary"
                            onChange={event => handleSelectOne(event, user.id)}
                            value={selectedEntities.indexOf(user.id) !== -1}
                          />
                        </TableCell>
                        <TableCell>
                          <div className={classes.nameCell}>
                            <Avatar className={classes.avatar}>
                              <PersonIcon />
                            </Avatar>
                            <div>
                              <Typography variant="h6">
                                {user.full_name}
                              </Typography>
                              <div>{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{user.type}</TableCell>
                        <TableCell align="right">
                          <ErrorButton
                            onClick={handleDeleteOne(user.id)}
                            size="small"
                            variant="outlined">
                            Delete
                          </ErrorButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow colspan="4">
                      <td colSpan="100">
                        <LinearProgress />
                      </td>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={users.length}
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
  users: PropTypes.array.isRequired,
};

Results.defaultProps = {
  users: [],
};

export default Results;
