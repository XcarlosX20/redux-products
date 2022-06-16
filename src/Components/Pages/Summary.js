import { Button, Card, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSummaryAction } from "../../Actions/ActionsRequests";
import { formatAmount } from "../../helpers";
import Side from "../Layout/Side";
import Loading from "../Utils/Loading";
import { Payment, ShoppingCart, Store } from "@mui/icons-material";
import moment from "moment";
import PreviousSummaries from "./summaries/PreviousSummaries";
const Summary = () => {
  const dispatch = useDispatch();
  const loadSummary = () => dispatch(getSummaryAction());
  useEffect(async () => {
    loadSummary();
  }, [dispatch]);
  const { summary } = useSelector((state) => state.request);
  const format = "DD/MM/YYYY";
  return (
    <Side>
      {summary ? (
        <>
          <Stack paddingBottom={2}>
            <h3>Summary</h3>
            <Typography>
              Eventual data beteween{" "}
              {moment(summary.timeRange.startDate).format(format)} and{" "}
              {moment(summary.timeRange.endDate).format(format)}
              {summary.endDate}
            </Typography>
          </Stack>
          <Grid
            gap={3}
            container
            direction="row"
            justifyContent="start"
            alignItems="center"
          >
            <Card sx={{ padding: "1rem" }}>
              <Grid container direction="row" justifyContent="space-between">
                <Typography>Income</Typography>
                <Store />
              </Grid>
              <Box className="format-amount-summary" color={"primary.main"}>
                {formatAmount(summary.earnings)}
              </Box>
            </Card>
            <Card sx={{ padding: "1rem" }}>
              <Typography>Number of sales</Typography>
              <Box className="format-amount-summary" color={"primary.main"}>
                {summary.orderLength}
                <ShoppingCart />
              </Box>
            </Card>
            <Card sx={{ padding: "1rem" }}>
              <Grid container direction="row" justifyContent="space-between">
                <Typography>Monthly fee</Typography>
                <Payment />
              </Grid>
              <Box className="format-amount-summary" color={"primary.main"}>
                {formatAmount(
                  (summary.earnings * 0.02).toFixed(2),
                  "$",
                  "(-2%)"
                )}
              </Box>
            </Card>
          </Grid>
          <PreviousSummaries />
        </>
      ) : (
        <Loading />
      )}
    </Side>
  );
};

export default Summary;
