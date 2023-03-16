import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import { RootObject } from '../helper/types';
import { Link } from 'react-router-dom';
import { numberWithCommas } from '../helper/utils';

interface CountryData {
    flagUrl: string;
    name: string;
    commonName: string;
    population: number;
    region: string;
    capital: string;
}

export default function CustomCard(props: { rows: RootObject[] }) {
    const { rows } = props;

    return (
        <Box
            sx={{
                px: {
                    xs: '30px',
                    sm: '50px',
                    md: '150px',
                },
                display: 'flex',
                justifyContent: { xs: 'center', sm: 'space-between' },
                flexWrap: 'wrap',
                rowGap: '30px',
            }}
        >
            {rows.map((data, i) => {
                const countryData: CountryData = {
                    flagUrl: data.flags.png,
                    name: data.name.official,
                    commonName: data.name.common,
                    population: data.population,
                    region: data.region,
                    capital: data.capital?.length > 0 ? data.capital[0] : 'N/A',
                };

                const countryUrl = `/${countryData.commonName.toLowerCase()}`;

                return (
                    <Link
                        key={countryData.name}
                        to={countryUrl}
                        style={{ color: 'inherit', textDecoration: 'inherit' }}
                    >
                        <Card
                            sx={{
                                width: 250,
                                height: {
                                    xs: 'auto',
                                    sm: 300,
                                },
                            }}
                        >
                            <CardActionArea sx={{ height: '100%' }}>
                                <CardMedia
                                    sx={{
                                        objectFit: 'fill',
                                        width: '100%',
                                    }}
                                    component="img"
                                    height="130"
                                    image={countryData.flagUrl}
                                    alt={`${countryData.name}-flag`}
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                        fontWeight={700}
                                        fontSize="20px"
                                    >
                                        {countryData.name}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div" fontSize="16px">
                                        <span style={{ fontWeight: 600 }}>Population: </span>
                                        {numberWithCommas(countryData.population)}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div" fontSize="16px">
                                        <span style={{ fontWeight: 600 }}>Region: </span>
                                        {countryData.region}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div" fontSize="16px">
                                        <span style={{ fontWeight: 600 }}>Capital: </span>
                                        {countryData.capital}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                );
            })}
        </Box>
    );
}
