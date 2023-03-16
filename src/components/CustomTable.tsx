import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import EnhandedTableHead from './EnhandedTableHead';
import { RootObject } from '../helper/types';
import { Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from '../helper/utils';

interface Props {
    rows: RootObject[];
}

export default function CustomTable(props: Props) {
    const { rows } = props;
    const navigate = useNavigate();

    const handleGoToCountyDetail = (countryName: string) => {
        navigate(`/${countryName.toLowerCase()}`);
    };
    return (
        <Box
            sx={{
                overflow: 'hidden',
                px: { xs: '5px', sm: '50px', md: '150px' },
            }}
        >
            <TableContainer
                sx={{
                    width: '100%',
                    maxHeight: '75vh',
                }}
            >
                <Table stickyHeader sx={{ width: '100%' }} size="small" aria-label="a dense table">
                    <EnhandedTableHead />
                    <TableBody>
                        {rows.map((row, i) => {
                            const countryName = row.name.common;

                            return (
                                <TableRow key={i} hover role="checkbox" tabIndex={-1} sx={{ cursor: 'pointer' }}>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        style={{ width: '150px' }}
                                        onClick={() => handleGoToCountyDetail(countryName)}
                                    >
                                        <img
                                            src={row.flags.png}
                                            alt={row.name.official}
                                            style={{ width: '80px', height: 'auto' }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        style={{ width: '150px' }}
                                        onClick={() => handleGoToCountyDetail(countryName)}
                                    >
                                        {numberWithCommas(row.population)}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        style={{ width: '150px' }}
                                        onClick={() => handleGoToCountyDetail(countryName)}
                                    >
                                        {row.region}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        style={{ width: '150px' }}
                                        onClick={() => handleGoToCountyDetail(countryName)}
                                    >
                                        {row.capital?.length > 0 ? row.capital[0] : 'N/A'}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        style={{ width: '150px' }}
                                        onClick={() => handleGoToCountyDetail(countryName)}
                                    >
                                        {row.name.official}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        style={{ width: '150px' }}
                                        onClick={() => handleGoToCountyDetail(countryName)}
                                    >
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
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
