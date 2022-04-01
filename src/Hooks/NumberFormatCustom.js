import NumberFormat from "react-number-format";
  const NumberFormatCustom  = (props) => {
    const { onChange, ...other } = props;
            return (
              <NumberFormat
                {...other}
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
export default NumberFormatCustom;
