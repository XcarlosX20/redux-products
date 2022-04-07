import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { getSearchResultsAction } from "../../Actions/ActionsProducts";
import { Container } from "@mui/material";
const Search = ({ products }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  useEffect(() => {
    const searchByKeywords = () => {
      if (value.length > 0) {
        const checkProducts = products.filter((product) => {
          return (
            product.productname.toLowerCase().includes(value.toLowerCase()) ||
            product.price.toString().toLowerCase().includes(Number(value))
          );
        });
        dispatch(getSearchResultsAction(checkProducts));
      }
    }
    searchByKeywords()
  }, [value]);
  useEffect(() => dispatch(getSearchResultsAction(null)),[value === ""])
  return (
    <>
      <Container
        id="search-bar"
        sx={{ padding: "20px" }}
        className="search-bar"
      >
        <Paper
          component="form"
          onSubmit={(e) => e.preventDefault()}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            margin: "0 auto",
            bgcolor: "#f7f7f9",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            value={value}
            placeholder="Search by products"
            onChange={(e) => setValue(e.target.value)}
            inputProps={{ "aria-label": "search" }}
          />
          {value.length > 0 ? (
            <IconButton onClick={() => setValue("")}>
              <ClearOutlinedIcon />
            </IconButton>
          ) : null}
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton type="submit" sx={{ p: 0.5 }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Container>
    </>
  );
};

export default Search;
