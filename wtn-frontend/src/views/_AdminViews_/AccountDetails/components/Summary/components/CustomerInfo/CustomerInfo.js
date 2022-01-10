import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import { CustomerEdit } from "./components";
import { useAccountDetailsContext } from "views/_AdminViews_/AccountDetails/hooks/account-details-context";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  actions: {
    flexDirection: "column",
    alignItems: "flex-start",
    "& > * + *": {
      marginLeft: 0,
    },
  },
  buttonIcon: {
    marginRight: theme.spacing(1),
  },
}));

const CustomerInfo = (props) => {
  const { customer = {}, className, ...rest } = props;

  const classes = useStyles();

  const { accountDetails } = useAccountDetailsContext();

  const [openEdit, setOpenEdit] = useState(false);

  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Thông tin tài khoản" />
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableBody>
            <TableRow selected>
              <TableCell>Họ tên</TableCell>
              <TableCell>{accountDetails.displayName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{accountDetails.email}</TableCell>
            </TableRow>

            <TableRow selected>
              <TableCell>Vai trò</TableCell>
              <TableCell>
                {accountDetails.customClaims?.role || "Học viên"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button onClick={handleEditOpen}>
          <EditIcon className={classes.buttonIcon} />
          Chỉnh sửa
        </Button>
      </CardActions>
      <CustomerEdit
        customer={customer}
        onClose={handleEditClose}
        open={openEdit}
      />
    </Card>
  );
};

CustomerInfo.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.object.isRequired,
};

export default CustomerInfo;
