import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import {
  Button,
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
import { Link as RouterLink } from "react-router-dom";

import { GenericMoreButton } from "components";
import usePaginate from "hooks/use-paginate";
import { useSubjectsContext } from "../../hooks/subjects-context";

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

  const classes = useStyles();
  const { subjects } = useSubjectsContext();

  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePaginate();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography color="textSecondary" gutterBottom variant="body2">
        Có {subjects.length} môn học.
      </Typography>
      <Card>
        <CardHeader action={<GenericMoreButton />} title="Tất cả môn học" />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox"></TableCell>
                    <TableCell>Tên môn học</TableCell>
                    <TableCell>Mô tả ngắn</TableCell>
                    <TableCell align="right">Tác vụ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subjects.slice(0, rowsPerPage).map((subject) => (
                    <TableRow hover key={subject.id}>
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell>
                        <Typography variant="h6">{subject.name}</Typography>
                      </TableCell>
                      <TableCell>{subject.brief}</TableCell>
                      <TableCell align="right">
                        <Button
                          component={RouterLink}
                          to={"/admin/subjects/" + subject.id}
                          color="primary"
                          size="small"
                          variant="outlined"
                        >
                          Chi tiết
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
            count={subjects.length}
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
  subjects: PropTypes.array.isRequired,
};

Results.defaultProps = {
  subjects: [],
};

export default Results;
