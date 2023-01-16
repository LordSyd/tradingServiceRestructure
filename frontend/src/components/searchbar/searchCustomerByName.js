
import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { lighten, darken, styled } from "@mui/material/styles";
import {Fragment, useContext, useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";



export default function SearchCustomerByName(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleClick = () => {
        props.onSubmit({
            firstName,
            lastName
        })
    }

    return (
        <Fragment>
            <div>
            <TextField id="filled-basic" label="First Name" variant="filled" value={firstName} onChange={(e) => {
                setFirstName(e.target.value);
            }} />
            </div>
            <div>
            <TextField id="filled-basic" label="Last Name" variant="filled" value={lastName} onChange={(e) => {
                setLastName(e.target.value);
            }} />
            </div>
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