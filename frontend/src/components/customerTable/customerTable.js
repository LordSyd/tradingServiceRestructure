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
import SearchCustomerContext from "../../context/getCustomer/getCustomerContext";

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


export default function CustomizedTablesCustomer() {

    //const searchCustomerContext = useContext(SearchCustomerContext)
    //const { customers } = searchCustomerContext;
    const customers = undefined

    return (
        <Fragment>
            {customers === undefined
                ? <Fragment/>
                :<TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Customer</StyledTableCell>
                                <StyledTableCell align="right">Customer ID</StyledTableCell>
                                <StyledTableCell align="right">First Name</StyledTableCell>
                                <StyledTableCell align="right">Last Name</StyledTableCell>
                                <StyledTableCell align="right">Address</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.map((customer) => (
                                <StyledTableRow key={customer.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {customer.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{customer.firstName}</StyledTableCell>
                                    <StyledTableCell align="right">{customer.lastName}</StyledTableCell>
                                    <StyledTableCell align="right">{customer.adresse}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </Fragment>





    );
}