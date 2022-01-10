import {
  Avatar,
  Card,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles(theme => ({
  card: {
    padding: "1rem",
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
}));

const TeacherCells = ({ teacher }) => {
  const classes = useStyles();
  return (
    <TableCell>
      <div className={classes.nameCell}>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
        <div>
          <Typography variant="h6">{teacher.name}</Typography>
          <div>{teacher.email}</div>
        </div>
      </div>
    </TableCell>
  );
};

const TeacherList = props => {
  const { title, teachers = [] } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Typography color="primary" gutterBottom component="h3" variant="h3">
        {title}
      </Typography>
      <Table>
        <TableBody>
          {teachers &&
            teachers.map(teacher => (
              <TableRow key={teacher.id} hover>
                <TeacherCells teacher={teacher} />
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default TeacherList;
