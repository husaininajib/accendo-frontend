import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import { RootObject } from '../helper/types';
import { useNavigate, Link, useSearchParams, createSearchParams } from 'react-router-dom';

interface CountryData {
    flagUrl: string;
    name: string;
    population: number;
    region: string;
    capital: string;
}

export default function CustomCard(props: { rows: RootObject[] }) {
    const { rows } = props;
    // const navigate = useNavigate();
    // const [searchParams, setSearchParams] = useSearchParams();

    return (
        <Box
            sx={{
                border: '1px solid red',
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
                    population: data.population,
                    region: data.region,
                    capital: data.capital?.length > 0 ? data.capital[0] : 'N/A',
                };

                const isLastIndex = rows.length - 1 === i ? true : false;

                const countryUrl = window.location.search
                    ? `/countries/${countryData.name.toLowerCase()}${window.location.search}`
                    : `/countries/${countryData.name.toLowerCase()}`;

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
                                        border: '1px solid red',
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
                                        {countryData.population}
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
