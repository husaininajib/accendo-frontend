import Box from '@mui/material/Box';
import SearchFilter from './SearchFilter';
import RegionFilter from './RegionFilter';
import ViewToggle from './ViewToggle';

interface Props {
    filterData: {
        search: string;
        selectedRegion: string;
    };
    handleFilterSearch: (x: string) => void;
    handleFilterRegion: (x: string) => void;
    view: 'card' | 'table';
    handleToggleView: () => void;
}

const CountryActions = (props: Props) => {
    const { filterData, handleFilterSearch, handleFilterRegion, view, handleToggleView } = props;
    const isCardView = view === 'card' ? true : false;
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: { xs: 'flex-start', sm: 'center' },
                alignItems: { xs: 'flex-start', sm: 'space-between' },
                paddingTop: '20px',
                paddingBottom: '35px',
                px: { xs: '30px', sm: '50px', md: '150px' },
            }}
        >
            <SearchFilter searchValue={filterData.search || ''} handleChange={handleFilterSearch} />

            <Box
                sx={{
                    display: 'flex',
                    gap: '4px',
                    justifyContent: { xs: 'space-between', sm: 'flex-end' },
                    alignItems: 'center',
                    width: '100%',
                    marginTop: { xs: '10px', sm: '0px' },
                }}
            >
                <RegionFilter dropdownValue={filterData.selectedRegion || ''} handleChange={handleFilterRegion} />

                <ViewToggle isCardView={isCardView} handleToggle={handleToggleView} />
            </Box>
        </Box>
    );
};

export default CountryActions;
