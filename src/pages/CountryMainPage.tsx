import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const CountryMainPage = () => {
    const [view, setView] = React.useState<'table' | 'card'>('card');

    const handleChangeView = () => {
        setView((prevView) => {
            return prevView === 'table' ? 'card' : 'table';
        });
    };

    return (
        <>
            <Header view={view} />
            <Outlet context={[view, handleChangeView]} />
        </>
    );
};

export default CountryMainPage;
