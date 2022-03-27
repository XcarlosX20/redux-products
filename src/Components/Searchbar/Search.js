import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { getSearchResultsAction } from "../../Actions/ActionsProducts";
import { Container } from "@mui/material";
const Search = ({ products }) => {
  const dispatch = useDispatch();
  const [fixedSearcher, setFixedSearcher] = useState(false)
  const [value, setValue] = useState("");
  const handleInput = (e) => {
    setValue(e.target.value);
    //filter for keyword
    const checkProducts = products
      .map((product) =>
        product.productname.toLowerCase().indexOf(value.toLowerCase()) !== -1 ? product : null
      )
      .filter((found) => found !== null);
    const results = checkProducts.filter((found) => found !== null);
    dispatch(getSearchResultsAction(results));
    if (value === "") dispatch(getSearchResultsAction(null));
  };
  useEffect(() => {
    if (value === "") {
      dispatch(getSearchResultsAction(null));
    }
  }, [value, setValue]);
  return (
    <>
      <Container id="search-bar"
       sx={{padding: '20px'}}
       className='search-bar'>
        <Paper
          component="form"
          onSubmit={(e) => e.preventDefault()}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            margin: '0 auto',
            bgcolor: '#f7f7f9'
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            value={value}
            placeholder="Search by products"
            onChange={handleInput}
            inputProps={{ "aria-label": "search" }}
          />
           {value.length > 0 ? (
            <IconButton onClick={() => setValue("")}>
               <ClearOutlinedIcon />
            </IconButton>
           ):null}
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
