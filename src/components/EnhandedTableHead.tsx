import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { headCells } from '../constants';
import { ColorModeContext } from './RootLayout';

const EnhandedTableHead = () => {
    const colorMode = React.useContext(ColorModeContext);
    return (
        <TableHead>
            <TableRow sx={{ border: '1px solid red' }}>
                {headCells.map((head) => {
                    return (
                        <TableCell
                            key={head.id}
                            style={{
                                width: '100px',
                                backgroundColor: colorMode.mode === 'light' ? '#000000' : '#fff',
                                color: colorMode.mode === 'light' ? '#ffffff' : '#000000',
                                fontWeight: 600,
                            }}
                        >
                            {head.label}
                        </TableCell>
                    );
                })}
            </TableRow>
        </TableHead>
    );
};

export default EnhandedTableHead;
