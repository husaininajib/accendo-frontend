import React from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import Header from '../components/Header';
import { RootObject } from '../helper/types';

const CountryMainPage = () => {
    const [view, setView] = React.useState<'table' | 'card'>('card');

    const handleToggleView = () => {
        setView((prevView) => {
            return prevView === 'table' ? 'card' : 'table';
        });
    };

    return (
        <>
            <Header view={view} />
            <Outlet context={[view, handleToggleView]} />
        </>
    );
};

export default CountryMainPage;
