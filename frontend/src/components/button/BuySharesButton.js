import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SelectedStockContext from "../../context/selectedStock/SelectedStockContext";
import {useContext} from "react";
export default function BuySharesButton(props) {
    const selectedStockContext = useContext(SelectedStockContext)
    return (
        <Box sx={{ '& button': { m: 1 } }}>
            <div>
                <Button disabled={!selectedStockContext.buyStockSelected} variant="contained" size="small" onClick={props.handleClick}>
                    Buy Selected Stock
                </Button>
            </div>
        </Box>
    );
}