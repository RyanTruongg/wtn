import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
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

import { GenericMoreButton } from "components";
import usePaginate from "hooks/use-paginate";
import { useAccountContext } from "../../hooks/account-context";
import { Link as RouterLink } from "react-router-dom";

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
    marginRight: theme.spacing(1),
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: "flex-end",
  },
}));

const Results = (props) => {
  const { className, handleDeleteOne, ...rest } = props;

  const { accounts } = useAccountContext();
  const classes = useStyles();

  const roleMap = {
    instructor: "Giảng viên",
    admin: "Quản trị viên",
  };

  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePaginate();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography color="textSecondary" gutterBottom variant="body2">
        Tổng {accounts.length} tài khoản.
        {Math.ceil(accounts.length / rowsPerPage)}
      </Typography>
      <Card>
        <CardHeader action={<GenericMoreButton />} title="Tất cả tài khoản" />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Họ tên {"&"} Email</TableCell>
                    <TableCell>Vai trò</TableCell>
                    <TableCell align="right">Tác vụ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {accounts.length > 0 ? (
                    accounts.slice(0, rowsPerPage).map((account) => (
                      <TableRow hover key={account.uid}>
                        <TableCell>
                          <div className={classes.nameCell}>
                            <Avatar
                              src={account.photoURL}
                              className={classes.avatar}
                            >
                              <PersonIcon />
                            </Avatar>
                            <div>
                              <Typography variant="h6">
                                {account.displayName}
                              </Typography>
                              <div>{account.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {roleMap[account.customClaims?.role] || "Học viên"}
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            component={RouterLink}
                            color="primary"
                            variant="outlined"
                            size="small"
                            to={`/admin/accounts/${account.uid}`}
                          >
                            Chi tiết
                          </Button>
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
            count={accounts.length}
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
};

export default Results;
