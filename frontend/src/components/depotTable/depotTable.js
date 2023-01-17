/*
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

function createData(name, companyValue, price, quantity) {
    return { name, companyValue, price, quantity };
}

const rows = [
    createData('Apple', 2000000, 65, 24),
    createData('Microsoft', 2000000, 65, 24),
    createData('Facebook', 2000000, 65, 24),
];

export default function CustomizedTablesDepot() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Your Depot</StyledTableCell>
                        <StyledTableCell align="right">Company Value&nbsp;(EUR)</StyledTableCell>
                        <StyledTableCell align="right">Price&nbsp;(EUR)</StyledTableCell>
                        <StyledTableCell align="right">Quantity&nbsp;(Stk)</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.companyValue}</StyledTableCell>
                            <StyledTableCell align="right">{row.price}</StyledTableCell>
                            <StyledTableCell align="right">{row.quantity}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}*/
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Fragment, useContext} from "react";
import SelectedCustomerContext from "../../context/selectedCustomer/selectedCustomerContext";

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

function createData(name, companyValue, price, quantity) {
    return { name, companyValue, price, quantity };
}


export default function CustomizedTablesAktien(props) {
    console.log("depot in table")

    console.log(props.depot)

    const stocks = props.depot; //todo change to selectedCustomer.stocks when endpoint done
    return (
        <Fragment>
            {stocks === undefined
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