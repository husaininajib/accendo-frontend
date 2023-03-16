import { Button, Box, Typography, CardMedia, Chip } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import React from 'react';
import { useParams } from 'react-router-dom';
import { RootObject } from '../helper/types';
import { fontColor, numberWithCommas } from '../helper/utils';
import { ColorModeContext } from './RootLayout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

interface CountryDetailProps {
    flags: {
        png: string;
        svg: string;
    };
    name: {
        common: string;
        official: string;
        nativeName: {
            [key: string]: {
                official: string;
                common: string;
            };
        };
    };
    population: number;
    region: string;
    subRegion: string;
    capital: string[];
    tld: string[];
    currencies: {
        [key: string]: {
            name: string;
            symbol: string;
        };
    };
    languages: {
        [key: string]: string;
    };
    borders: string[];
}

const CountryDetails = () => {
    const { dynamicCountry } = useParams();
    const { countryDetail } = useGetCountryDetails(dynamicCountry);
    const navigate = useNavigate();
    const colorMode = React.useContext(ColorModeContext);

    const isCountryExist = (countryData: CountryDetailProps | null) => {
        if (countryData) {
            return Object.keys(countryData).length > 0 ? true : false;
        }

        return false;
    };

    const displayValue = (countryDetail: CountryDetailProps, key: keyof CountryDetailProps) => {
        if (key === 'flags') {
            return countryDetail[key].png;
        }
        if (key === 'name') {
            const keys = Object.keys(countryDetail[key].nativeName);

            return countryDetail[key].nativeName[keys[0]].common;
        }

        if (key === 'capital' || key === 'tld') {
            return countryDetail[key].join(', ');
        }

        if (key === 'currencies') {
            const keys = Object.keys(countryDetail[key]);

            return countryDetail[key][keys[0]].name;
        }

        if (key === 'languages') {
            const keys = Object.keys(countryDetail[key]);

            return countryDetail[key][keys[0]];
        }

        if (key === 'borders') {
            return countryDetail[key];
        }
        //@ts-ignore
        return typeof countryDetail[key] === 'number' ? numberWithCommas(countryDetail[key]) : countryDetail[key];
    };

    return (
        <>
            <Button startIcon={<ArrowBackIcon />} sx={{ mt: '25px' }} variant="outlined" onClick={() => navigate('/')}>
                Back
            </Button>

            {isCountryExist(countryDetail) ? (
                <Box sx={{ mt: '30px', pb: { xs: '40px', sm: '0px' } }}>
                    <Box display={'flex'} alignItems="stretch" flexWrap={'wrap'} gap="10px">
                        {countryDetail?.flags.png && (
                            <CardMedia
                                component="img"
                                height="auto"
                                sx={{ width: { xs: '100%', sm: 'auto', objectFit: 'fill' } }}
                                image={countryDetail.flags.png}
                                alt={countryDetail.name.official}
                            />
                        )}

                        <div>
                            <Typography ml="16px" fontWeight={600} fontSize="30px" color={fontColor(colorMode.mode)}>
                                {countryDetail?.name.official}
                            </Typography>

                            <Box display={'flex'} flexWrap={'wrap'}>
                                <List>
                                    {DataList.filter(
                                        (data) =>
                                            !['tld', 'currencies', 'languages', 'borders', 'flags'].includes(data.id)
                                    ).map((data) => {
                                        return (
                                            <ListItem key={data.id}>
                                                <Typography color={fontColor(colorMode.mode)}>
                                                    <span style={{ fontWeight: 600 }}>{data.label}:</span>{' '}
                                                    {countryDetail &&
                                                        displayValue(
                                                            countryDetail,
                                                            data.id as keyof CountryDetailProps
                                                        )}
                                                </Typography>
                                            </ListItem>
                                        );
                                    })}
                                </List>

                                <List>
                                    {DataList.filter((data) =>
                                        ['tld', 'currencies', 'languages'].includes(data.id)
                                    ).map((data) => {
                                        return (
                                            <ListItem key={data.id}>
                                                <Typography color={fontColor(colorMode.mode)}>
                                                    <span style={{ fontWeight: 600 }}>{data.label}:</span>{' '}
                                                    {countryDetail &&
                                                        displayValue(
                                                            countryDetail,
                                                            data.id as keyof CountryDetailProps
                                                        )}
                                                </Typography>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Box>

                            {countryDetail &&
                                DataList.filter((data) => ['borders'].includes(data.id)).map((data) => {
                                    return (
                                        <Box
                                            sx={{
                                                display: { xs: 'block', sm: 'flex' },
                                                alignItems: 'center',
                                                justifyContent: 'flex-start',
                                                gap: '5px',
                                                ml: '16px',
                                            }}
                                            key={data.id}
                                        >
                                            <Typography fontWeight={600} color={fontColor(colorMode.mode)}>
                                                {data.label}:
                                            </Typography>

                                            <div>
                                                {Array.isArray(
                                                    displayValue(countryDetail, data.id as keyof CountryDetailProps)
                                                ) &&
                                                    (
                                                        displayValue(
                                                            countryDetail,
                                                            data.id as keyof CountryDetailProps
                                                        ) as string[]
                                                    ).map((border, i) => (
                                                        <Chip key={i} size="small" label={border} variant="outlined" />
                                                    ))}
                                            </div>
                                        </Box>
                                    );
                                })}
                        </div>
                    </Box>
                </Box>
            ) : (
                <Box sx={{ mt: '30px' }}>The country you're looking for is not exist :(</Box>
            )}
        </>
    );
};

export default CountryDetails;

// CUSTOM HOOKS
export const useGetCountryDetails = (coutryParam: string | undefined) => {
    const [countryDetail, setCountryDetail] = React.useState<CountryDetailProps | null>(null);

    React.useEffect(() => {
        const getData = async () => {
            try {
                const url = 'https://restcountries.com/v3.1/all';
                const request = await fetch(url);
                const response = await request.json();
                const country = (response as RootObject[]).find((res) => res.name.common.toLowerCase() === coutryParam);

                const dataKeys = DataList.map((data) => data.id);
                // @ts-ignore
                const data: CountryDetailProps = {};

                for (const key in country) {
                    if (dataKeys.includes(key)) {
                        // @ts-ignore
                        data[key] = country[key];
                    }
                }

                setCountryDetail(data);
            } catch (err) {
                console.error(err);
            }
        };
        if (coutryParam) getData();
    }, []);

    return { countryDetail };
};

const DataList = [
    {
        id: 'flags',
        label: '',
    },
    {
        id: 'name',
        label: 'Native Name',
    },
    {
        id: 'population',
        label: 'Population',
    },
    {
        id: 'region',
        label: 'Region',
    },
    {
        id: 'subregion',
        label: 'Sub Region',
    },
    {
        id: 'capital',
        label: 'Capital',
    },
    {
        id: 'tld',
        label: 'Top Level Domain',
    },
    {
        id: 'currencies',
        label: 'Currencies',
    },
    {
        id: 'languages',
        label: 'Languages',
    },
    {
        id: 'borders',
        label: 'Border Countries',
    },
];
