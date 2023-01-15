
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { lighten, darken, styled } from "@mui/material/styles";
import {Fragment, useContext, useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import GetCustomerContext from "../../context/getCustomer/getCustomerContext";


export default function SearchCustomer() {
    const [text, setText] = useState("");
    const getCustomerContext = useContext(GetCustomerContext)
    const {customers, getCustomer} = getCustomerContext;
    const handleClick = () => {
        getCustomer()
        console.log("get customer")
    }

    return (
        <Fragment>
            {console.log(customers)}
            <TextField id="filled-basic" label="Filled" variant="filled" value={text} onChange={(e) => {
                setText(e.target.value);
            }} />
            <Box sx={{ '& button': { m: 1 } }}>
                <div>
                    <Button variant="contained" size="small" onClick={() => {
                        handleClick();
                    }}>
                        Search Customer
                    </Button>
                </div>
            </Box>
        </Fragment>

    );
}