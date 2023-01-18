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
import SearchShareContext from "../../context/searchShare/searchShareContext";

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


export default function CustomizedTablesAktien() {

    const searchShareContext = useContext(SearchShareContext)
    const { stocks } = searchShareContext;

    return (
        <Fragment>
            {stocks == undefined
                ? <Fragment/>
                :<TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Company</StyledTableCell>
                                <StyledTableCell align="right">Float Shares&nbsp;(Stk)</StyledTableCell>
                                <StyledTableCell align="right">Last Price&nbsp;(EUR)</StyledTableCell>
                                <StyledTableCell align="right">Market Capitalization&nbsp;(Mrd. EUR)</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stocks.map((stock) => (
                                <StyledTableRow key={stock.companyName}>
                                    <StyledTableCell component="th" scope="row">
                                        {stock.companyName}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{stock.floatShares}</StyledTableCell>
                                    <StyledTableCell align="right">{stock.lastTradePrice}</StyledTableCell>
                                    <StyledTableCell align="right">{(stock.marketCapitalization/(Math.pow(10, 9))).toFixed(4)}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </Fragment>





    );
}