import React from "react";
import PropTypes from "prop-types";
import { Grid, TableCell, TableRow } from "@material-ui/core";
import { Skeleton as MUISkeleton } from "@material-ui/lab";

function Skeleton(props) {
  const { variant = "card", height, count } = props;

  if (variant === "card") {
    return (
      <React.Fragment>
        {[...Array(count)].map(e => (
          <Grid item xs={12} sm={6} md={4}>
            <MUISkeleton
              style={{ borderRadius: 4 }}
              variant="rectangular"
              width={"100%"}
              height={height}
            />
          </Grid>
        ))}
      </React.Fragment>
    );
  }

  if (variant === "table-row") {
    return (
      <React.Fragment>
        {[...Array(count)].map((e, i) => (
          <TableRow key={i} hover>
            <TableCell size="100%">
              <MUISkeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                height={height}
              />
            </TableCell>
          </TableRow>
        ))}
      </React.Fragment>
    );
  }
}

Skeleton.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["card", "table-row"]),
  height: PropTypes.string,
  count: PropTypes.number,
};

export default Skeleton;
