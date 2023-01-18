
import React, {useContext, useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {Fragment} from "react";
import SelectedCustomerContext from "../../context/selectedCustomer/selectedCustomerContext";

export default function SearchSymbol(props) {
    const [text, setText] = useState("");

    const selectedCustomerContext = useContext(SelectedCustomerContext)

    const {selectedCustomer} = selectedCustomerContext;
    const handleClick = () => {
        props.onSubmit(text)
    }

    const disabled = () => {
        if (props.customer) {
            return false
        }
        return selectedCustomer == undefined;

    }
    return (
        <Fragment>
            <TextField id="filled-basic" label={"Comma seperated stock symbols"} InputLabelProps={{ shrink: true }} variant="filled" sx={{ label: { color: '#8e8e8e' }, input: { color: '#8e8e8e' }}} value={text} onChange={(e) => {
                setText(e.target.value);
            }} />
            <Box sx={{ '& button': { m: 1 } }}>

                        <span>
                            <Button disabled={disabled()}  variant="contained" size="small" onClick={() => {
                                handleClick();
                            }}>
                                Search Symbol
                            </Button>
                        </span>

            </Box>
        </Fragment>


    );
}
