import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { headCells } from '../constants';

const EnhandedTableHead = () => {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((head) => {
                    return (
                        <TableCell key={head.id} style={{ width: '100px' }}>
                            {head.label}
                        </TableCell>
                    );
                })}
            </TableRow>
        </TableHead>
    );
};

export default EnhandedTableHead;
