import React,{useState, useEffect} from 'react'
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
const useNumberFormatCustom = (initialValue) => {
    const [numberformat, setNumberformat] = useState(initialValue);
    const changeValue = (value) => setNumberformat(value)
        const NumberFormatCustom = (props) => {
            const { inputRef, onChange, ...other } = props;
            
            return (
              <NumberFormat
                {...other}
                getInputRef={inputRef}
                value={numberformat}
                onValueChange={(values) => {
                  onChange({
                    target: {
                      name: props.name,
                      value: values.value,
                    },
                  });
                }}
                thousandSeparator
                isNumericString
                prefix="$"
              />
            );
          }
     
    return {numberformat, changeValue, NumberFormatCustom};
}
 
export default useNumberFormatCustom;
