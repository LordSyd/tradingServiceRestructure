import React, {useState} from 'react';
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
import GetCustomerContext from "../../context/getCustomer/getCustomerContext";
import SelectedCustomerContext from "../../context/selectedCustomer/selectedCustomerContext";
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


function createData(name, companyValue, price, quantity) {
    return { name, companyValue, price, quantity };
}

export default function CustomerTable() {
    const [selectedRow, setSelectedRow] = useState();

    const getCustomerContext = useContext(GetCustomerContext);
    const selectedCustomerContext = useContext(SelectedCustomerContext);

    const {selectCustomer} = selectedCustomerContext;
    const costumers = getCustomerContext.customers;
    console.log("in table")
    console.log(getCustomerContext)
    function handleClick(event, customer) {
        console.log("customer")
        const id = customer.id
        console.log(id)
        setSelectedRow(id);
        selectCustomer(customer);
    }

    return (
        <Fragment>
            {
                console.log("selected row" + selectedRow)
            }
            {costumers === undefined
                ? <Fragment/>
                :<TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Select</StyledTableCell>
                                <StyledTableCell align="right">Name</StyledTableCell>
                                <StyledTableCell align="right">Surename</StyledTableCell>
                                <StyledTableCell align="right">Adresse</StyledTableCell>
                                <StyledTableCell align="right">ID</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {costumers.map((customer) => {
                                return (
                                    <Fragment>
                                        <StyledTableRow
                                            key={customer.name}
                                            hover
                                            onClick={(event) => handleClick(event, customer)}
                                            role="checkbox"
                                            aria-checked={customer.id == selectedRow}
                                            tabIndex={-1}
                                            selected={customer.id == selectedRow}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={customer.id == selectedRow}
                                            />
                                            </TableCell>
                                            <StyledTableCell align="right" >
                                                {customer.firstName}
                                            </StyledTableCell >
                                            <StyledTableCell align="right">{customer.lastName}</StyledTableCell>
                                            <StyledTableCell align="right">{customer.address}</StyledTableCell>
                                            <StyledTableCell align="right">{customer.id}</StyledTableCell>
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