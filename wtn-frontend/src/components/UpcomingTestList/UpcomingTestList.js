import React from "react";
import {
  Card,
  Link,
  Table,
  TableBody,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import { TestCells, Skeleton } from "components";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1rem",
  },
  table: {
    marginBottom: "0.5rem",
  },
  linkWraper: {
    display: "flex",
    justifyContent: "flex-end",
    "& > a": {
      marginRight: "1rem",
    },
  },
}));

const OverviewCard = (props) => {
  const { className, title, tests = { data: [], status: "pending" } } = props;
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)}>
      <Typography color="secondary" gutterBottom component="h3" variant="h3">
        {title}
      </Typography>

      <PerfectScrollbar>
        <Table className={classes.table}>
          <TableBody>
            {tests.status === "success" &&
              tests.data.map((test) => (
                <TableRow key={test.id} hover>
                  <TestCells test={test} />
                </TableRow>
              ))}

            {tests.status === "pending" && (
              <Skeleton variant="table-row" height="42px" count={3} />
            )}

            {tests.status === "failed" && (
              <Alert severity="error" className={classes.mb}>
                This is an error alert — check it out!
              </Alert>
            )}
          </TableBody>
        </Table>
      </PerfectScrollbar>

      <div className={classes.linkWraper}>
        <Link
          color="secondary"
          component={RouterLink}
          to="#!"
          underline="always"
          variant="subtitle2"
        >
          And {tests.data?.length} more
        </Link>
      </div>
    </Card>
  );
};

export default OverviewCard;
