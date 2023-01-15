
import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { lighten, darken, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import Box from "@mui/material/Box";
import {Fragment} from "react";

export default function SearchShare(props) {
    const [text, setText] = useState("");
    /*const options = top100Films.map((option) => {
        const firstLetter = option.title[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });*/
    const handleClick = () => {

        props.onSubmit(text)

    }



    return (
        <Fragment>
            <TextField id="filled-basic" label="Filled" variant="filled" value={text} onChange={(e) => {
                setText(e.target.value);
            }} />
            <Box sx={{ '& button': { m: 1 } }}>
                <div>
                    <Button variant="contained" size="small" onClick={() => {
                        handleClick();
                    }}>
                        Search Share
                    </Button>
                </div>
            </Box>
        </Fragment>



        /*<Autocomplete
            id="grouped-demo"
            options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.title}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} sx={{ label: { color: '#8e8e8e' }, input: { color: '#8e8e8e' }}} label="With categories" />}
            renderGroup={(params) => (
                <li>
                    <GroupHeader>{params.group}</GroupHeader>
                    <GroupItems>{params.children}</GroupItems>
                </li>
            )}
        />*/
    );
}
