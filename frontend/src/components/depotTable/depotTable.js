import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Fragment} from "react";

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


export default function CustomizedTablesAktien(props) {
    const stocks = props.depot; //todo change to selectedCustomer.stocks when endpoint done

    return (
        <Fragment>
            {stocks == undefined
                ? <Fragment>
                    <h2>No Stocks in Depot</h2>
                </Fragment>
                :<TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Company</StyledTableCell>
                                <StyledTableCell align="right">Shares&nbsp;(Stk)</StyledTableCell>
                                <StyledTableCell align="right">Current Price&nbsp;(EUR/Stock)</StyledTableCell>
                                <StyledTableCell align="right">Current Volume</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stocks.map((stock) => (
                                <StyledTableRow key={stock.companyName}>
                                    <StyledTableCell key={Math.random()}component="th" scope="row">
                                        {stock.companyName}
                                    </StyledTableCell>
                                    <StyledTableCell key={Math.random()} align="right">{stock.quantity.toLocaleString('de-DE')}</StyledTableCell>
                                    <StyledTableCell key={Math.random()} align="right">{stock.currentPrice.toLocaleString('de-DE')}</StyledTableCell>
                                    <StyledTableCell key={Math.random()} align="right">{stock.currentStockVolume.toLocaleString('de-DE')}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </Fragment>





    );
}