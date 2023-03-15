import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EnhandedTableHead from './EnhandedTableHead';
import { RootObject } from '../helper/types';
import { Chip } from '@mui/material';

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    return { name, calories, fat, carbs, protein };
}

interface Props {
    rows: RootObject[];
}

export default function CustomTable(props: Props) {
    const { rows } = props;
    return (
        <Paper
            sx={{
                overflow: 'hidden',
                border: '3px solid green',
                px: { xs: '5px', sm: '50px', md: '150px' },
            }}
        >
            <TableContainer
                sx={{
                    width: '100%',
                    border: '2px solid blue',
                    maxHeight: '75vh',
                }}
            >
                <Table
                    stickyHeader
                    sx={{ width: '100%', border: '2px solid orange' }}
                    size="small"
                    aria-label="a dense table"
                >
                    <EnhandedTableHead />
                    <TableBody>
                        {/* <Content data={rows} /> */}
                        {rows.map((row, i) => (
                            <TableRow key={i} hover role="checkbox" tabIndex={-1}>
                                <TableCell component="th" scope="row" style={{ width: '150px' }}>
                                    <img
                                        src={row.flags.png}
                                        alt={row.name.official}
                                        style={{ width: '80px', height: 'auto' }}
                                    />
                                </TableCell>

                                <TableCell align="left" style={{ width: '150px' }}>
                                    {row.population}
                                </TableCell>

                                <TableCell align="left" style={{ width: '150px' }}>
                                    {row.region}
                                </TableCell>

                                <TableCell align="left" style={{ width: '150px' }}>
                                    {row.capital?.length > 0 ? row.capital[0] : 'N/A'}
                                </TableCell>

                                <TableCell align="left" style={{ width: '150px' }}>
                                    {row.name.official}
                                </TableCell>

                                <TableCell align="left" style={{ width: '150px' }}>
                                    {row.currencies
                                        ? Object.entries(row.currencies).map((currency, i) => {
                                              return (
                                                  <Chip
                                                      key={i}
                                                      label={`${currency[1].symbol} ${currency[0]}`}
                                                      sx={{ mr: '3px' }}
                                                      size="small"
                                                  />
                                              );
                                          })
                                        : 'N/A'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
