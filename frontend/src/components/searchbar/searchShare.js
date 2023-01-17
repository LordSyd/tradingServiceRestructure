
import React, {useContext, useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { lighten, darken, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import Box from "@mui/material/Box";
import {Fragment} from "react";
import SelectedCustomerContext from "../../context/selectedCustomer/selectedCustomerContext";
import {Tooltip} from "chart.js";

export default function SearchShare(props) {
    const [text, setText] = useState("");

    const selectedCustomerContext = useContext(SelectedCustomerContext)

    const {selectedCustomer} = selectedCustomerContext;
    const handleClick = () => {

        props.onSubmit(text)

    }
    console.log("selectedCustomer in button")
    console.log(selectedCustomer)
    const disabled = () => {
        if (props.customer) {
            return false
        }
        return selectedCustomer === undefined;

    }
    return (
        <Fragment>
            <TextField id="filled-basic" label={text ? null : "Stock Name"} InputLabelProps={{ shrink: true }} variant="filled" sx={{ label: { color: '#8e8e8e' }, input: { color: '#8e8e8e' }}} value={text} onChange={(e) => {
                setText(e.target.value);
            }} />
            <Box sx={{ '& button': { m: 1 } }}>


                        <span>
                            <Button disabled={disabled()}  variant="contained" size="small" onClick={() => {
                                handleClick();
                            }}>
                                Search Share
                            </Button>
                        </span>



            </Box>
        </Fragment>



        /*<Autocomplete
            id="grouped-demo"
            options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.title}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params}  label="With categories" />}
            renderGroup={(params) => (
                <li>
                    <GroupHeader>{params.group}</GroupHeader>
                    <GroupItems>{params.children}</GroupItems>
                </li>
            )}
        />*/
    );
}
