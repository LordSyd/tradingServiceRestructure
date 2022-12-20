import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";

export default function addCustomerButton() {
    return (
        <Box sx={{ '& button': { m: 1 } }}>
            <div>
                <Button variant="contained" size="small"><Link to="/register">
                    Add Customer
                </Link>
                </Button>
            </div>
        </Box>
    );
}