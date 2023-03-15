import React from 'react';
import { RootObject } from '../helper/types';
import CountryActions from './CountryActions';
import CustomCard from './CustomCard';
import CustomTable from './CustomTable';
import { useOutletContext } from 'react-router-dom';

interface FilterData {
    search: string;
    selectedRegion: string;
}

interface Props {
    view: 'table' | 'card';
    handleChangeView: () => void;
}

const CountryView = () => {
    const [filterData, setFilterData] = React.useState<FilterData>({
        search: '',
        selectedRegion: '',
    });
    const { countries, filteredCountry, setFilteredCountry } = useGetCountries();
    const [view, handleChangeView] = useOutletContext<any>();

    const handleFilterSearch = (value: string) => {
        setFilterData((prevState) => {
            return { ...prevState, search: value };
        });
    };

    const handleFilterRegion = (value: string) => {
        setFilterData((prevState) => {
            return { ...prevState, selectedRegion: value };
        });
    };

    const handleToggleView = () => {
        // setIsCardView((prevState) => !prevState);
        // const currentView = searchParams.get('view');
        // const newView = currentView === 'table' ? 'card' : 'table';
        // searchParams.set('view', newView);
        // navigate({ search: searchParams.toString() });
    };

    React.useEffect(() => {
        const filtered = countries.filter((data) => {
            const countryName = data.name.official.toLowerCase();
            const searchValue = filterData.search.toLowerCase();
            const seletedRegionValue = filterData.selectedRegion.toLowerCase();
            if (filterData.selectedRegion) {
                return countryName.includes(searchValue) && data.region.toLowerCase() === seletedRegionValue;
            }

            return countryName.includes(searchValue);
        });

        setFilteredCountry(filtered);
    }, [filterData]);

    return (
        <>
            <CountryActions
                filterData={filterData}
                view={view}
                handleFilterSearch={handleFilterSearch}
                handleFilterRegion={handleFilterRegion}
                handleChangeView={handleChangeView}
            />

            <div>
                {view === 'card' ? (
                    <CustomCard
                        rows={filteredCountry}
                        // rows={countries}
                    />
                ) : (
                    <CustomTable
                        rows={filteredCountry}
                        // rows={countries}
                    />
                )}
            </div>
        </>
    );
};

export default CountryView;

// CUSTOM HOOKS
const useGetCountries = () => {
    const [countries, setCountries] = React.useState<RootObject[]>([]);
    const [filteredCountry, setFilteredCountry] = React.useState<RootObject[]>([]);

    React.useEffect(() => {
        const getData = async () => {
            try {
                const url = 'https://restcountries.com/v3.1/all';
                const request = await fetch(url);
                const response = await request.json();

                if (countries.length === 0) {
                    setCountries(response);
                    setFilteredCountry(response);
                }
            } catch (err) {
                console.error(err);
            }
        };
        console.log('here');
        getData();
    }, []);

    return { countries, filteredCountry, setFilteredCountry };
};
