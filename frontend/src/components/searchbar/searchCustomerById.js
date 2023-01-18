
import React from 'react';
import TextField from '@mui/material/TextField';
import {Fragment, useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";



export default function SearchCustomerById(props) {
    const [id, setId] = useState("");

    const handleClick = () => {
        props.onSubmit(id)
    }

    return (
        <Fragment>
            <div>
                <TextField id="filled-basic" label="Id" variant="filled" value={id} onChange={(e) => {
                    setId(e.target.value);
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