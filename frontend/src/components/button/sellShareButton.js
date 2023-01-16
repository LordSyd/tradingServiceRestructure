import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function sellShareButton(props) {
    return (
        <Box sx={{ '& button': { m: 1 } }}>
            <div>
                <Button variant="contained" size="small" onClick={props.onClick}>
                    Sell Share
                </Button>
            </div>
        </Box>
    );
}