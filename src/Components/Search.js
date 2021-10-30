import React,{useState} from 'react'
const Search = ({products}) => {
    const [results, setResults] = useState(null)
    const handleInput = (e) => {
        let value = e.target.value.toLowerCase();
        //filter keywords
        for (let product of products) {
            const productname = product.productname.toLowerCase();
           if(productname.indexOf(value) !== -1){
               //fix:get all
               setResults(product);
           }
        }
        if(value === "") setResults(null);
    }
    return ( 
        <>
        <input onChange={handleInput} 
        className="form-control w-75" 
        type="text" 
        placeholder="Search any product" />
        </>
     );
}
 
export default Search;