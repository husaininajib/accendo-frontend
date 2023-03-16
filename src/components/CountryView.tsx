import React, { lazy, Suspense } from 'react';
import { RootObject } from '../helper/types';
import CountryActions from './CountryActions';
import { useOutletContext } from 'react-router-dom';
import { ColorModeContext } from './RootLayout';
import Loading from './Loading';

export interface FilterData {
    search: string;
    selectedRegion: string;
}

const CustomCard = lazy(() => import('./CustomCard'));
const CustomTable = lazy(() => import('./CustomTable'));

const CountryView = () => {
    const [isPending, startTransition] = React.useTransition();
    const [filterData, setFilterData] = React.useState<FilterData>({
        search: '',
        selectedRegion: '',
    });
    const { countries, filteredCountry, setFilteredCountry } = useGetCountries();
    const [view, handleToggleView] = useOutletContext<any>();

    const handleFilterSearch = (value: string) => {
        setFilterData((prevState) => {
            return { ...prevState, search: value };
        });
        startTransition(() => {
            const filtered = (countries as RootObject[]).filter((data) => {
                const countryName = data.name.official.toLowerCase();
                const searchValue = value.toLowerCase();
                const seletedRegionValue = filterData.selectedRegion.toLowerCase();
                if (filterData.selectedRegion) {
                    return countryName.includes(searchValue) && data.region.toLowerCase() === seletedRegionValue;
                }

                return countryName.includes(searchValue);
            });
            setFilteredCountry(filtered);
        });
    };

    const handleFilterRegion = (value: string) => {
        setFilterData((prevState) => {
            return { ...prevState, selectedRegion: value };
        });
        startTransition(() => {
            const filtered = (countries as RootObject[]).filter((data) => {
                const countryName = data.name.official.toLowerCase();
                const searchValue = filterData.search.toLowerCase();
                const seletedRegionValue = value.toLowerCase();
                if (seletedRegionValue) {
                    return countryName.includes(searchValue) && data.region.toLowerCase() === seletedRegionValue;
                }

                return countryName.includes(searchValue);
            });
            setFilteredCountry(filtered);
        });
    };

    const newHandleToggleView = () => {
        // create a new toggle function reduced sluggish issue
        startTransition(() => {
            handleToggleView();
        });
    };

    const itemToDisplay = (isPending: boolean, view: 'card' | 'table') => {
        if (isPending) {
            return <Loading />;
        } else {
            return view === 'card' ? (
                <Suspense fallback={<Loading />}>
                    <CustomCard rows={filteredCountry} />
                </Suspense>
            ) : (
                <Suspense fallback={<Loading />}>
                    <CustomTable rows={filteredCountry} />
                </Suspense>
            );
        }
    };

    return (
        <>
            <CountryActions
                filterData={filterData}
                view={view}
                handleFilterSearch={handleFilterSearch}
                handleFilterRegion={handleFilterRegion}
                handleToggleView={newHandleToggleView}
            />

            <div
                style={{
                    paddingTop: '10px',
                }}
            >
                {filteredCountry.length > 0 ? itemToDisplay(isPending, view) : <Loading />}
            </div>
        </>
    );
};

export default CountryView;

// CUSTOM HOOKS
export const useGetCountries = () => {
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
        // console.log('here');
        getData();
    }, []);

    return { countries, filteredCountry, setFilteredCountry };
};
