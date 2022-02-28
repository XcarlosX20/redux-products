import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getSearchResultsAction } from '../../Actions/ActionsProducts';
const Search = ({ products }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("");
    const handleInput = (e) => {
        setValue(e.target.value.toLowerCase());
        //filter for keyword
        const checkProducts = products.map(product => (product.productname.toLowerCase().indexOf(value) !== -1 ? product : null)).filter(found => found !== null);
        const results = checkProducts.filter(found => found !== null);
        dispatch(getSearchResultsAction(results));
        if(value === "") dispatch(getSearchResultsAction(null));
    }
    useEffect(() => {
       if(value === ""){
           dispatch(getSearchResultsAction(null));
        }
     }, [value, setValue]);
    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="row search-bar">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend"
                        style={{cursor: 'pointer', transition: "all ease .3s", marginRight:"5px"}}>
                            <span onClick={() => setValue("")} 
                            className={`input-group-text h-100 w-100 ${value.length > 0 ? 'border border-danger' : null}`}>
                                {value.length > 0 ?
                                    (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                    <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                  </svg>) :
                                    (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>)}
                            </span>
                        </div>
                        <input onChange={handleInput} value={value} type="text" className="form-control" placeholder="Search any product" aria-describedby="basic-addon1" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Search;