import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Side from "../../Layout/Side";
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { setCategoriesAction } from "../../../Actions/ActionsCompany";
const Categories = () => {
  let dispatch = useDispatch()
  const { _id, categories } = useSelector((state) => state.auth.company);
  const deleteCategory = async(categorySelected) => {
      let categoryDeleted = categories.filter((category) => category !== categorySelected)
      dispatch(setCategoriesAction(categoryDeleted))
  }
  return (
    <>
      <Side>
        <Grid
          gap={3}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {categories.map((category) => (
            <Card sx={{ minWidth: 180 }}>
              <CardContent>
                <Typography
                  sx={{ textTransform: "capitalize" }}
                  variant="h5"
                  component="div"
                >
                  {bull}
                  {category}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => deleteCategory(category)}
                  size="small"
                  color="error"
                >
                  <Delete />
                </Button>
              </CardActions>
            </Card>
          ))}
        </Grid>
      </Side>
    </>
  );
};

export default Categories;
