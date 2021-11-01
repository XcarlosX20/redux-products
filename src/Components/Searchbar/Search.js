import React, { useState } from 'react'
import Results from './Results';
const Search = ({ products }) => {
    const [searchResults, setSearchResults] = useState(null)
    const handleInput = (e) => {
        let value = e.target.value.toLowerCase();
        //filter for keywords
        const checkProducts = products.map(product => (product.productname.toLowerCase().indexOf(value) !== -1 ? product : null)).filter(found => found !== null);
        const results = checkProducts.filter(found => found !== null);
        setSearchResults(results);
        if (value === "") setSearchResults(null);
    }
    return (
        <>
            <div style={{ minWidth: "100%" }}>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text h-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </span>
                    </div>
                    <input onChange={handleInput} type="text" class="form-control" placeholder="Search any product" aria-label="Username" aria-describedby="basic-addon1" />
                </div>

                {searchResults !== null ?
                    (<div className="my-2">
                        <div className="list-group">
                            {searchResults.map(product => (
                                <Results product={product} key={product.id} />
                            ))}
                        </div>
                    </div>
                    ) : null
                }
                {searchResults !== null & searchResults < 1 ? <div className="alert "><p className="text-danger text-center">No results</p></div> : null}
            </div>
        </>
    );
}

export default Search;