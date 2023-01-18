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



export default function ClickableStockTable(props) {

    const selectedStockContext = useContext(SelectedStockContext);
    const {buyStockSelect , buyStockSelected} = selectedStockContext;

    const stocks = props.stocks
    function handleClick(event, stock) {
        buyStockSelect(stock);
    }

    return (
        <Fragment>
            {stocks == undefined
                ? <Fragment/>
                :<TableContainer sx={{overflow: "scroll"}} component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Select</StyledTableCell>
                                <StyledTableCell align="right">Company</StyledTableCell>
                                <StyledTableCell align="right">Float Shares&nbsp;(Stk)</StyledTableCell>
                                <StyledTableCell align="right">Last Price&nbsp;(EUR)</StyledTableCell>
                                <StyledTableCell align="right">Market Capitalization&nbsp;(Mrd. EUR)</StyledTableCell>
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
                                            aria-checked={stock.symbol == buyStockSelected?.symbol}
                                            tabIndex={-1}
                                            selected={stock.symbol == buyStockSelected?.symbol}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={stock.symbol == buyStockSelected?.symbol}
                                                />
                                            </TableCell>
                                            <StyledTableCell key={Math.random()} align="right" >
                                                {stock.companyName}
                                            </StyledTableCell >
                                            <StyledTableCell key={Math.random()} align="right">{stock.floatShares?.toLocaleString('de-DE')}</StyledTableCell>
                                            <StyledTableCell key={Math.random()} align="right">{stock.lastTradePrice?.toLocaleString('de-DE')}</StyledTableCell>
                                            <StyledTableCell key={Math.random()} align="right">{stock.marketCapitalization?.toLocaleString('de-DE')}</StyledTableCell>
                                        </StyledTableRow>
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