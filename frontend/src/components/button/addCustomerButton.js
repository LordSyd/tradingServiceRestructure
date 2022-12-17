import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function addCustomerButton() {
    return (
        <Box sx={{ '& button': { m: 1 } }}>
            <div>
                <Button variant="contained" size="small">
                    Add Customer
                </Button>
            </div>
        </Box>
    );
}