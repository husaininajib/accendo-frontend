import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { RootObject } from '../helper/types';
import { REGIONS } from '../constants';
import { ColorModeContext } from './RootLayout';
import SearchFilter from './SearchFilter';
import RegionFilter from './RegionFilter';
import ViewToggle from './ViewToggle';

interface Props {
    // countries: RootObject[];
    filterData: {
        search: string;
        selectedRegion: string;
    };
    handleFilterSearch: (x: string) => void;
    handleFilterRegion: (x: string) => void;
    // isCardView: boolean;
    view: 'card' | 'table';
    handleChangeView: () => void;
    // isDarkmode: boolean;
}

const CountryActions = (props: Props) => {
    const { filterData, handleFilterSearch, handleFilterRegion, view, handleChangeView } = props;
    const colorMode = React.useContext(ColorModeContext);
    const isCardView = view === 'card' ? true : false;
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: { xs: 'flex-start', sm: 'center' },
                alignItems: { xs: 'flex-start', sm: 'space-between' },
                paddingTop: '20px',
                marginBottom: '35px',
                border: '1px solid red',
                px: { xs: '30px', sm: '50px', md: '150px' },
                backgroundColor: colorMode.mode === 'dark' ? 'black' : 'white',
                // backgroundColor: isDarkmode ? 'black' : 'white',
                // color: isDarkmode ? 'white' : 'black',
            }}
        >
            <SearchFilter searchValue={filterData.search || ''} handleChange={handleFilterSearch} />

            <Box
                sx={{
                    display: 'flex',
                    gap: '4px',
                    justifyContent: { xs: 'space-between', sm: 'flex-end' },
                    alignItems: 'center',
                    border: '1px solid blue',
                    width: '100%',
                    marginTop: { xs: '10px', sm: '0px' },
                }}
            >
                <RegionFilter dropdownValue={filterData.selectedRegion || ''} handleChange={handleFilterRegion} />

                <ViewToggle isCardView={isCardView} handleToggle={handleChangeView} />
            </Box>
        </Box>
    );
};

export default CountryActions;
