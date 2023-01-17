import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import SelectedStockContext from "../../context/selectedStock/SelectedStockContext";
import {useContext} from "react";

export default function SellShareButton(props) {
    const selectedStockContext = useContext(SelectedStockContext)
    return (
        <Box sx={{ '& button': { m: 1 } }}>
                <Button disabled={!selectedStockContext.sellStockSelected} variant="contained" size="small" onClick={props.onClick}>
                    Sell Share
                </Button>
        </Box>
    );
}