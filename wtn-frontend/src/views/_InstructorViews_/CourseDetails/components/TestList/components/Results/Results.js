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
import usePaginate from "hooks/use-paginate";
import { useTestContext } from "../../hooks/test-list-context";

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

  const { tests } = useTestContext();

  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePaginate();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography color="textSecondary" gutterBottom variant="body2">
        Tổng {tests.length} bài kiểm tra.
      </Typography>
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title="Tất cả bài kiểm tra"
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên bài kiểm tra</TableCell>
                    <TableCell>Bắt đầu</TableCell>
                    <TableCell>Kết thúc</TableCell>
                    <TableCell>Trạng thái</TableCell>
                    <TableCell align="right">Tác vụ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tests.slice(0, rowsPerPage).map((test) => (
                    <TableRow hover key={test.id}>
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
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
};

Results.defaultProps = {};

export default Results;
