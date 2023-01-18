import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Fragment, useContext} from "react";
import {Checkbox} from "@mui/material";
import SelectedStockContext from "../../context/selectedStock/SelectedStockContext";
/*import SearchBoxContext from "../../context/searchBox/searchBoxContext";*/

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



export default function ClickableStockTableSell(props) {

    const selectedStockContext = useContext(SelectedStockContext);

    const {sellStockSelect , sellStockSelected} = selectedStockContext;


    const stocks = props.depot

    function handleClick(event, stock) {
        sellStockSelect(stock);
    }
    console.log(stocks)
    return (
        <Fragment>
            {stocks.length === 0
                ? <Fragment>
                    <h2>No Stocks in Depot</h2>
                </Fragment>
                :<TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Select</StyledTableCell>
                                <StyledTableCell>Company</StyledTableCell>
                                <StyledTableCell align="right">Shares&nbsp;(Stk)</StyledTableCell>
                                <StyledTableCell align="right">Current Price&nbsp;(EUR/Stock)</StyledTableCell>
                                <StyledTableCell align="right">Current Volume</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stocks.map((stock) => {
                                return (
                                    <Fragment>
                                        <StyledTableRow
                                            key={stock.companyName}
                                            hover
                                            onClick={(event) => handleClick(event, stock)}
                                            role="checkbox"
                                            aria-checked={stock.symbol == sellStockSelected?.symbol}
                                            tabIndex={-1}
                                            selected={stock.symbol == sellStockSelected?.symbol}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={stock.symbol == sellStockSelected?.symbol}
                                                />
                                            </TableCell>
                                            <StyledTableCell key={Math.random()}align="right" >
                                                {stock.companyName}
                                            </StyledTableCell >
                                            <StyledTableCell key={Math.random()} align="right">{stock.quantity.toLocaleString('de-DE')}</StyledTableCell>
                                            <StyledTableCell key={Math.random()} align="right">{stock.currentPrice.toLocaleString('de-DE')}</StyledTableCell>
                                            <StyledTableCell  key={Math.random()} align="right">{stock.currentStockVolume.toLocaleString('de-DE')}</StyledTableCell>                                        </StyledTableRow>
                                    </Fragment>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </Fragment>

    );
}